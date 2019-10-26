const path = require('path');
const mem = require('mem-fs');
const memEditor = require('mem-fs-editor');
const globby = require('globby');
const fs = require('fs-extra');
const camelcase = require('camelcase');

const components = require('./components');
const { keys } = Object;


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

    const properties = [
      { name: 'uuid', type: 'String', defaultValue: 'null' },
      { name: 'style', type: 'String', defaultValue: 'null' },
      { name: 'className', type: 'String', defaultValue: 'null' }
    ].concat(
      data.events,
      data.properties
    );

    if (data.open) {
      properties.unshift({ name: 'child', type: 'Object', defaultValue: 'null' })
    }
    

    fs.mkdirpSync(path.resolve(dist, `remix-${data.name}`));

    return builder.render(path.resolve(dist, `remix-${data.name}`), {
      openComponent: data.open,
      tagName: data.name,
      props: properties.map(props => {
        if (props.name === 'className') {
          return `class="{{${camelcase(props.name)}}}"`;
        }

        return `${props.name}="{{${camelcase(props.name)}}}"`
      }).join(' '),
      properties: properties.map(props => {
        return `${camelcase(props.name)}: ${props.type},\n\t\t`
      }).join(''),
      usingComponents: names.map((name, index) => {
        const symbol = index === names.length - 1 ? '' : ',';

        if (name === data.name) {
          return `"remix-${name}": "./index"${symbol}\n\t\t` 
        }

        return `"remix-${name}": "../remix-${name}/index"${symbol}\n\t\t`
      }).join(''),
      data: properties.map(props => {
        return `${camelcase(props.name)}: ${props.defaultValue},\n\t\t`
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
      { name: 'uuid', type: 'String', defaultValue: 'null' },
      { name: 'style', type: 'Object', defaultValue: 'null' },
      { name: 'className', type: 'String', defaultValue: 'null' }
    ].concat(
      data.events.map(event => {
        event.type = 'event';
        return event;
      }),
      data.properties
    );

    fs.mkdirpSync(path.resolve(dist, `remix-${data.name}`));

    return builder.render(path.resolve(dist, `remix-${data.name}`), {
      openComponent: data.open,
      tagName: data.name,
      className: `${camelcase(`remix-${data.name}`, { pascalCase: true })}`,
      properties: properties.map(props => {
        return camelcase(props.name)
      }).join(', '),
      props: properties.map(props => {
        if (props.type === 'event') {
          return `${camelcase(props.name)}={${camelcase(props.name)} ? '${camelcase(props.name)}' : null}`
        }

        return `${camelcase(props.name)}={${camelcase(props.name)}}`
      }).join(' '),
      propTypes: properties.map(props => {
        return `${camelcase(props.name)}: PropTypes.${(props.type === 'Boolean' ? 'bool' : props.type).toLowerCase()},\n\t\t`
      }).join(''),
      defaultProps: properties.map(props => {
        return `${camelcase(props.name)}: ${props.defaultValue},\n\t\t`
      }).join('')
    });
  }));
}

async function buildWorkWXML (dist) {
  const builder = new Builder(
    path.resolve(__dirname, 'fixed'),
    ['remix-worker.wxml'],
  );

  const names = keys(components);

  await builder.render(dist, {
    components: names.map(name => {
      const data = components[name];
      const properties = [
        { name: 'uuid', type: 'String', defaultValue: 'null' },
        { name: 'style', type: 'Object', defaultValue: 'null' },
        { name: 'className', type: 'String', defaultValue: 'null' }
      ].concat(
        data.events,
        data.properties
      );

      if (data.open) {
        properties.unshift({ name: 'child', type: 'Object', defaultValue: 'null' })
      }

      const props = properties.map(props => {
        if (props.name === 'style') {
          return `${camelcase(props.name)}="{{element.${camelcase(props.name)} || ''}}"`
        }

        return `${camelcase(props.name)}="{{element.${camelcase(props.name)}}}"`
      }).join(' ')

      return `<block wx:elif="{{ element.tagName == '${data.name}' }}">\n\t\t<remix-${data.name} ${props} />\n\t</block>`
    }).join('\n\t')
  });
}

async function buildView (dist) {
  const files = await globby('./**/*', {
    cwd: path.resolve(__dirname, 'fixed/view'),
    dot: true
  });
  const builder = new Builder(
    path.resolve(__dirname, 'fixed/view'),
    files,
  );

  const names = keys(components);

  await builder.render(path.resolve(dist, 'view'), {
    usingComponents: names.map((name, index) => {
      const data = components[name];
      const symbol = index === names.length - 1 ? '' : ',';

      return `"remix-${name}": "../remix-${name}/index"${symbol}\n\t\t`
    }).join('')
  });
}

async function buildText (dist) {
  const files = await globby('./**/*', {
    cwd: path.resolve(__dirname, 'fixed/text'),
    dot: true
  });
  const builder = new Builder(
    path.resolve(__dirname, 'fixed/text'),
    files,
  );

  const names = keys(components);

  await builder.render(path.resolve(dist, 'text'), {
    usingComponents: names.map((name, index) => {
      const data = components[name];
      const symbol = index === names.length - 1 ? '' : ',';

      return `"remix-${name}": "../remix-${name}/index"${symbol}\n\t\t`
    }).join('')
  });
}

module.exports = async function (dist) {
  await buildWXML(path.resolve(dist, 'remix-ui'), components);
  await buildWorkWXML(path.resolve(dist, 'remix-ui'), components);
  await buildView(path.resolve(dist, 'remix-ui'), components);
  await buildText(path.resolve(dist, 'remix-ui'), components);
  await buildJS(path.resolve(dist, 'remix-element'), components);
}
