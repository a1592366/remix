const { resolve } = require('path');
const camelcase = require('camelcase');
const views = require('../views');
const events = require('../events');
const copy = require('../../../../shared/copy');

const viewKeys = Object.keys(views);
const indent = `,\n\t`;

async function toJavaScriptFile (dist, view) {
  let props = events.concat(view.events).map(({ name, camel }) => {
    return `${camel}={${camel} ? '${camel}' : null }`;
  });

  props = props.concat(
    view.properties.map(({ camel }) => {
      return `${camel}={${camel}}`;
    })
  );

  props = props.join(' ');

  const combined = view.properties.concat(events, view.events);
    
  let propTypes = combined.map(({ camel, type }, index) => {
    const isLast = index === combined.length - 1;
    const eof = isLast ? '' : `${indent}`;

    return `${camel}: PropTypes.${type.toLowerCase()}${eof}`;
  }).join('');

  const defaultProps = combined.map(({ camel, defaultValue }, index) => {
    const isLast = index === combined.length - 1;
    const eof = isLast ? '' : `${indent}`;

    return `${camel}: ${defaultValue}${eof}`;
  }).join('');

  const thisProps = combined.map(({ camel, defaultValue }, index) => {
    const isLast = index === combined.length - 1;
    const eof = isLast ? '' : `${indent}\t`;

    return `${camel}${eof}`;
  }).join('');


  return await copy(
    __dirname,
    dist,
    ['./index.js']
  )({
    name: camelcase(`Remix-${view.name}`, { pascalCase: true }),
    tagName: view.name,
    propTypes,
    defaultProps,
    props,
    thisProps
  });
}

module.exports = async function (dist) {
  await Promise.all(viewKeys.map(key => {
    const filename = resolve(dist, `remix-${key}`);
    const view = views[key];

    return toJavaScriptFile(filename, view);
  }));

  await copy(
    __dirname,
    dist,
    ['./elements.js']
  )({
    imports: viewKeys.map(key => {
      views[key];

      const name = key === 'textarea' ?
        'TextArea' : key;

      return `import ${camelcase(`${name}`, { pascalCase: true })} from './remix-${key}'`;
    }).join(';\n'),
    exports: viewKeys.map(key => {
      views[key];

      const name = key === 'textarea' ?
        'TextArea' : key;

      return `'${key}': ${camelcase(`${name}`, { pascalCase: true })}`;
    }).join(',\n\t')
  })
}

module.exports(resolve(__dirname, 'RemixUI'));