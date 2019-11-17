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
    { name: 'parent', type: 'String', defaultValue: 'null' },
    { name: 'style', type: 'String', defaultValue: 'null' },
    { name: 'className', type: 'String', defaultValue: 'null' }
  ].concat(component.properties).map(prop => {
    prop.camel = camelcase(prop.fullname || prop.name);

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
    files.filter(file => file === 'index.wxml'),
  );

  const names = keys(components).filter(name => {
    return name !== 'text' && name !== 'root' && name !== 'view';
  });

  await Promise.all(names.map(name => {
    const data = components[name];
    const events = (data.name === 'root' ? baseEvents : (data.name === 'text' ? [] : baseEvents).concat(data.events)).map(event => {
      return `${event.name} (e) { transports.view.dispatch('${event.name}', this.data.uuid, this.data.parent, e); }`
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
      props: properties.map(props => {
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
      }).join('\n\t'),
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

async function buildViewAndText (dist, components) {
  const files = await globby('./**/*', {
    cwd: path.resolve(__dirname, 'files'),
    dot: true
  });

  const builder = new Builder(
    path.resolve(__dirname, 'files'),
    files.filter(file => file !== 'INDEX.md')
  );

  const names = keys(components).filter(name => {
    return name === 'view' || name === 'text' || name === 'root';
  });

  await Promise.all(names.map(name => {
    const data = components[name];
    const events = (data.name === 'root' ? baseEvents : (data.name === 'text' ? [] : baseEvents).concat(data.events)).map(event => {
      return `${event.name} (e) { transports.view.dispatch('${event.name}', this.data.uuid, this.data.parent, e); }`
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
      props: properties.map(props => {
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
      }).join('\n\t'),
      properties: properties.map(props => {
        return `${props.camel}: ${props.type},\n\t\t`;
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
          return `${props.camel}={${props.camel} ? '${props.camel}' : ''}`
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
    ['inner-remix-worker.wxml', 'remix-worker.wxml', 'deep-remix-worker.wxml', 'remix-slibings.wxs'],
  );

  const names = keys(components);

  await builder.render(dist, {
    imports: names.filter(name => {
      return name !== 'view' &&
        name !== 'root' &&
        name !== 'text'
    }).map((name) => {
      const data = components[name];

      return `<import src="./remix-${data.name}/index.wxml" />`
    }).join('\n'),
    components: names.map((name, index) => {
      const data = components[name];

      if (data.name === 'view' || data.name === 'root' || data.name === 'text') {
        const tagName = data.name === 'root' ? `remix-${data.name}` : data.name;
        let props = data.properties.map(prop => {
          const key = data.name === 'root' ? prop.camel : prop.name;

          if (data.name !== 'root') {
            if (prop.name === 'className') {
              return `class="{{element.${prop.camel}}}"`;
            }

            if (prop.name === 'uuid') {
              return `id="{{element.${prop.camel}}}" uuid="{{element.${prop.camel}}}"`;
            }
          }

          return `${key}="{{element.${prop.camel}}}"`;
        });

        if (data.name !== 'text') {
          

          props = props.concat(baseEvents.map((event) => {
            const key = data.name === 'root' ? event.camel : event.alias;

            return `${key}="{{element.${event.camel}}}"`
          }));
        }

        return `<block wx:elif="{{ element.tagName == '${data.name}' }}">\n\t\t<${tagName} ${props.join(' ')}  />\n\t</block>`;
      }

      return `<block wx:elif="{{ element.tagName == '${data.name}' }}">\n\t\t<template is="${data.name}" data="{{ ...element }}" />\n\t</block>`
    }).join('\n\t')
  });
}

module.exports = async function (dist) {
  await buildWXML(path.resolve(dist, 'remix-ui'), components);
  await buildViewAndText(path.resolve(dist, 'remix-ui'), components);
  await buildWorkWXML(path.resolve(dist, 'remix-ui'), components);
  // await buildView(path.resolve(dist, 'remix-ui'), components);
  // await buildText(path.resolve(dist, 'remix-ui'), components);
  await buildJS(path.resolve(dist, 'remix-element'), components);
}
