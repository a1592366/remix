const path = require('path');
const mem = require('mem-fs');
const memEditor = require('mem-fs-editor');
const globby = require('globby');
const fs = require('fs-extra');
const camelcase = require('camelcase');

const components = require('./components');
const { keys } = Object;


const baseEvents = [
  { name: 'onTouchStart', type: 'String', alias: 'bind:touchstart', defaultValue: 'null' },
  { name: 'onTouchMove', type: 'String', alias: 'bind:touchmove', defaultValue: 'null' },
  { name: 'onTouchCancel', type: 'String', alias: 'bind:touchcancel', defaultValue: 'null' },
  { name: 'onTouchEnd', type: 'String', alias: 'bind:touchend', defaultValue: 'null' },
  { name: 'onTap', type: 'String', alias: 'bind:tap', defaultValue: 'null' },
  { name: 'onLongPress', type: 'String', alias: 'bind:longpress', defaultValue: 'null' },
  { name: 'onLongTap', type: 'String', alias: 'bind:longtap', defaultValue: 'null' },
  { name: 'onTouchForceChange', type: 'String', alias: 'bind:touchforcechange', defaultValue: 'null' },
  { name: 'onTransitionEnd', type: 'String', alias: 'bind:transitionend', defaultValue: 'null' },
  { name: 'onAnimationStart', type: 'String', alias: 'bind:animationstart', defaultValue: 'null' },
  { name: 'onAnimationIteration', type: 'String', alias: 'bind:animationiteration', defaultValue: 'null' },
  { name: 'onAnimationEnd', type: 'String', alias: 'bind:animationend', defaultValue: 'null' },
].map((event) => {
  event.isEvent = true;
  event.camel = event.name;

  return event;
});

keys(components).forEach(key => {
  const component = components[key];

  component.events = component.events.map(event => {
    event.isEvent = true;
    event.camel = event.name;

    return event;
  });

  component.properties = [
    { name: 'uuid', type: 'String', defaultValue: 'null' },
    { name: 'style', type: 'String', defaultValue: 'null' },
    { name: 'className', type: 'String', defaultValue: 'null' }
  ].concat(component.properties).map(prop => {
    prop.camel = camelcase(prop.name);

    return prop;
  })

  if (component.open) {
    component.properties.unshift(
      { name: 'child', type: 'Object', defaultValue: 'null', camel: 'child' },
      { name: 'innerText', type: 'String', defaultValue: 'null', camel: 'innerText' },
    );
  }
})

class Builder {
  constructor (src, files) {
    this.src = src;
    this.files = files;

    this.store = mem.create();
    this.fs = memEditor.create(this.store);
  }

  async copy (dist, file, model, callback) {
    this.fs.copyTpl(
      path.resolve(this.src, typeof file === 'object' ? file.name : file),
      path.resolve(dist, typeof file === 'object' ? file.alias : file),
      model
    );

    callback(file);
  }

  async commit (callback) {
    this.fs.commit(callback);
  }

  async render (dist, model) {
    this.files.forEach((file, index) => {
      index = index + 1;

      const number = index > 9 ? `${index}. ` : `${index}.  `;

      this.copy(dist, file, model, (file) => {
        console.info(`${number} ${file.name || file}`);
      });
    });

    return new Promise((resolve, reject) => {
      this.commit(async () => {
        resolve();
      });
    });
  }
}

async function buildWXML (dist, components) {
  const files = await globby('./**/*', {
    cwd: path.resolve(__dirname, 'files'),
    dot: true
  });

  const builder = new Builder(
    path.resolve(__dirname, 'files'),
    files.filter(file => file !== 'INDEX.md'),
  );

  const names = keys(components);

  await Promise.all(names.map(name => {
    const data = components[name];
    const events = (data.name === 'root' ? baseEvents : (data.name === 'text' ? [] : baseEvents).concat(data.events)).map(event => {
      return `${event.name} (e) { transports.view.dispatch('${event.name}', this.data.uuid, e); }`
    }).join(',\n\t\t');

    const properties = data.name === 'root' ? 
      [].concat(
        baseEvents, 
        [
          { name: 'child', type: 'Object', defaultValue: 'null', camel: 'child' },
          { name: 'uuid', type: 'String', defaultValue: 'null', camel: 'uuid' }
        ]
      ) : 
      (data.name === 'text' ? [] : baseEvents).concat(
        data.events,
        data.properties
      );    

    fs.mkdirpSync(path.resolve(dist, `remix-${data.name}`));

    return builder.render(path.resolve(dist, `remix-${data.name}`), {
      openComponent: data.open,
      name: data.name,
      tagName: data.name === 'root' ? 'view' : data.name,
      props: properties.filter(props => {
        return props.name !== 'className' ||
          props.name !== 'style'
      }).map(props => {
        if (props.isEvent) {
          return `${props.alias}="{{${props.camel}}}"`
        }

        switch (props.name) {
          case 'className':
            return `class="{{${props.camel}}}"`;

          case 'style':
            return `style="{{${props.camel}}}"`;

          case 'uuid':
            return `id="{{${props.camel}}}"`;

          default: {
            return `${props.name}="{{${props.camel}}}"`
          }
        }
      }).join(' '),
      properties: properties.map(props => {
        return `${props.camel}: ${props.type},\n\t\t`;
      }).join(''),
      usingComponents: names.map((name, index) => {
        const symbol = index === names.length - 1 ? '' : ',';

        if (name === data.name) {
          return `"remix-${name}": "./index"${symbol}\n\t\t` 
        }

        return `"remix-${name}": "../remix-${name}/index"${symbol}\n\t\t`
      }).join(''),
      data: properties.map(props => {
        return `${props.camel}: ${props.defaultValue},\n\t\t`
      }).join(''),
      events
    });
  }));
}

async function buildJS(dist, components) {
  const builder = new Builder(
    path.resolve(__dirname, 'files'),
    [{ name: 'INDEX.md', alias: 'index.js'}],
  );

  const names = keys(components);

  await Promise.all(names.map(name => {
    const data = components[name];

    const properties = (data.name === 'text' ? [] : baseEvents).concat(
      data.events,
      data.properties.map(prop => {
        if (prop.name === 'styles') {
          prop.name = 'style';
          prop.camel = 'style';
        }

        return prop;
      })
    ).filter(prop => {
      if (
        prop.name === 'innerText' ||
        prop.name === 'child' ||
        prop.name === 'uuid'
      ) {
        return false;
      }

      return true
    });

    fs.mkdirpSync(path.resolve(dist, `remix-${data.name}`));

    return builder.render(path.resolve(dist, `remix-${data.name}`), {
      openComponent: data.open,
      tagName: data.name,
      name: data.name,
      className: `${camelcase(`remix-${data.name}`, { pascalCase: true })}`,
      properties: properties.map(props => {
        return props.camel
      }).join(', '),
      events: (data.name === 'text' ? [] : baseEvents).concat(data.events).map(event => {
        return `${event.camel} (e) { \n\t\tconst { ${event.camel} } = this.props;\n\t\tif (typeof ${event.camel} === 'function') { ${event.camel}(e); } \n\t}`
      }).join('\n\n\t'),
      props: properties.map(props => {
        if (props.isEvent) {
          return `${props.camel}={${props.camel} ? '${props.camel}' : null}`
        }

        return `${props.camel}={${props.camel}}`
      }).join(' '),
      propTypes: properties.map(props => {
        return `${props.camel}: PropTypes.${(props.type === 'Boolean' ? 'bool' : props.type).toLowerCase()},\n\t\t`
      }).join(''),
      defaultProps: properties.map(props => {
        return `${props.camel}: ${props.defaultValue},\n\t\t`
      }).join('')
    });
  }));
}

async function buildWorkWXML (dist) {
  const builder = new Builder(
    path.resolve(__dirname, 'fixed'),
    ['remix-worker.wxml', 'remix-slibings.wxs'],
  );

  const names = keys(components);

  await builder.render(dist, {
    components: names.map((name, index) => {
      const data = components[name];
      const properties = [].concat(
        data.name === 'root' ? baseEvents : (data.name === 'text' ? [] : baseEvents).concat(data.events),
        data.properties
      );
      const symbol = 'elif';

      if (data.name === 'swiper-item') {
        return `<block wx:${symbol}="{{ element.tagName == '${data.name}' }}">\n\t\t<swiper-item item-id="{{element.itemId}}"><remix-view child="{{element.child}}" innerText="{{element.innerText}}" uuid="{{element.uuid}}" style="{{element.style || ''}}" className="{{element.className}}" /></swiper-item>\n\t</block>`;
      }

      const props = properties.map((props, index) => {
        if (props.name === 'style') {
          return `${props.camel}="{{element.${props.camel} || ''}}"`
        }

        if (props.name === 'className') {
          return `class="{{element.${props.camel} || ''}}"`
        }

        return `${props.camel}="{{element.${props.camel}}}"`
      }).join(' ');

      return `<block wx:${symbol}="{{ element.tagName == '${data.name}' }}">\n\t\t<remix-${data.name} data-remix-id="{{element.uuid}}" ${props} />\n\t</block>`
    }).join('\n\t')
  });
}

module.exports = async function (dist) {
  await buildWXML(path.resolve(dist, 'remix-ui'), components);
  await buildWorkWXML(path.resolve(dist, 'remix-ui'), components);
  // await buildView(path.resolve(dist, 'remix-ui'), components);
  // await buildText(path.resolve(dist, 'remix-ui'), components);
  await buildJS(path.resolve(dist, 'remix-element'), components);
}
