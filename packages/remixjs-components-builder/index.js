const path = require('path');
const mem = require('mem-fs');
const memEditor = require('mem-fs-editor');
const globby = require('globby');
const fs = require('fs-extra');
const camelcase = require('camelcase');

const components = require('./components');
const { keys } = Object;


const baseEvents = [
  { name: 'onTouchStart', type: 'String', alias: 'catchtouchstart', defaultValue: 'null' },
  { name: 'onTouchMove', type: 'String', alias: 'catchtouchmove', defaultValue: 'null' },
  { name: 'onTouchCancel', type: 'String', alias: 'catchtouchcancel', defaultValue: 'null' },
  { name: 'onTouchEnd', type: 'String', alias: 'catchtouchend', defaultValue: 'null' },
  { name: 'onTap', type: 'String', alias: 'catchtap', defaultValue: 'null' },
  { name: 'onLongPress', type: 'String', alias: 'catchlongpress', defaultValue: 'null' },
  { name: 'onLongTap', type: 'String', alias: 'catchlongtap', defaultValue: 'null' },
  { name: 'onTransitionEnd', type: 'String', alias: 'catchtransitionend', defaultValue: 'null' },
  { name: 'onAnimationStart', type: 'String', alias: 'catchanimationstart', defaultValue: 'null' },
  { name: 'onAnimationIteration', type: 'String', alias: 'catchanimationiteration', defaultValue: 'null' },
  { name: 'onAnimationEnd', type: 'String', alias: 'catchanimationend', defaultValue: 'null' },
  { name: 'onTouchForceChange', type: 'String', alias: 'catchtouchforcechange', defaultValue: 'null' },
]

keys(components).forEach(key => {
  const component = components[key];

  component.events = component.events.concat(baseEvents).map(event => {
    event.isEvent = true;
    event.camel = event.name;

    return event;
  });

  component.properties = [
    { name: 'uuid', type: 'String', defaultValue: 'null' },
    { name: 'styles', type: 'String', defaultValue: 'null' },
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
    const events = data.events.map(event => {
      return `${event.name} (e) { transports.view.dispatch('${event.name}', this.data.uuid, e); }`
    }).join(',\n\t\t');

    const properties = [].concat(
      data.events,
      data.properties
    );    

    fs.mkdirpSync(path.resolve(dist, `remix-${data.name}`));

    return builder.render(path.resolve(dist, `remix-${data.name}`), {
      openComponent: data.open,
      tagName: data.name,
      props: properties.map(props => {
        if (props.isEvent) {
          return `${props.alias}="{{${props.camel}}}"`
        }

        switch (props.name) {
          case 'className':
            return `class="{{${props.camel}}}"`;

          case 'styles':
            return `style="{{${props.camel}}}"`;

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

    const properties = [
    ].concat(
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
        data.events,
        data.properties
      );
      const symbol = 'elif';

      if (data.name === 'swiper-item') {
        return `<block wx:${symbol}="{{ element.tagName == '${data.name}' }}">\n\t\t<swiper-item item-id="{{element.itemId}}"><remix-view child="{{element.child}}" innerText="{{element.innerText}}" uuid="{{element.uuid}}" styles="{{element.styles || ''}}" className="{{element.className}}" /></swiper-item>\n\t</block>`;
      }

      const props = properties.map((props, index) => {
        if (props.name === 'styles') {
          return `${props.camel}="{{element.${props.camel} || ''}}"`
        }

        return `${props.camel}="{{element.${props.camel}}}"`
      }).join(' ');

      return `<block wx:${symbol}="{{ element.tagName == '${data.name}' }}">\n\t\t<remix-${data.name} ${props} />\n\t</block>`
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
