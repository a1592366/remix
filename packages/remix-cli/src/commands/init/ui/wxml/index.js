const { resolve } = require('path');
const fs = require('fs-extra');
const views = require('../views');
const events = require('../events');
const createWorker = require('../worker');
const copy = require('../../../../shared/copy');

const viewKeys = Object.keys(views);
const indent = `\n\t\t`;

// const wrapper = `input textarea`.split(' ');
// const replace = `input textarea view text`.split(' ');

const replace = ['view text'];
const wrapper = [];

async function toJSONFile (dist, view) {
  await copy(
    __dirname,
    dist,
    ['./index.json']
  )({});
}

async function toJavaScriptFile (dist, view) {
  const methods = events.concat(view.events).map(({ name }) => {
    return `${name} (e) { ViewNativeSupport.Publisher.Event('${name}', e); }`;
  });

  const combined = view.properties.concat(events, view.events);
    
  let properties = combined.map(({ camel, type }, index) => {
    const isLast = index === combined.length - 1;
    const eof = isLast ? '' : `,${indent}`;

    return `${camel}: ${type}${eof}`;
  }).join('');

  const data = combined.map(({ camel, defaultValue }, index) => {
    const isLast = index === combined.length - 1;
    const eof = isLast ? '' : `,${indent}`;

    return `${camel}: ${defaultValue}${eof}`;
  }).join('');

  return await copy(
    __dirname,
    dist,
    ['./~index.js']
  )({
    methods,
    properties,
    data
  });
}

async function toWXMLFile (dist, view) {
  let properties = view.properties.concat(events, view.events);

  if (wrapper.includes(view.name)) {
    properties = properties.filter(prop => {
      if (prop.name === 'style' || prop.name === 'className') {
        return false;
      }

      return true;
    })
  }
  
  let props = properties.map((prop, index) => {
    const { alias, camel, name } = prop;
    const line = [
      alias, 
      `"{{${camel}}}"`
    ];

    if (name === 'className') {
      line[0] = 'class';
    } else if (name === 'style') {
      line[0] = 'style';
    } else if (name === 'uuid') {
      line[0] = 'id';
    } else {
      line[0] = alias;
    }

    return line.join('=');
  }).join('\n\t\t');

  if (view.worker) {
    await createWorker(dist)
  }

  return await copy(
    __dirname,
    dist,
    ['./index.wxml']
  )({
    open: view.open,
    name: view.name,
    tagName: view.name,
    worker: view.worker,
    replace: view.replace,
    wrapper: view.wrapper,
    props: `\t${props}`
  })
}

module.exports = async function (dist) {
  await Promise.all(viewKeys.map(key => {
    const path = resolve(dist, `remix-${key}`);
    const view = views[key];

    let promises = [toWXMLFile(path, view)];

    if (replace.includes(key)) {
      promises = promises.concat([
        toJSONFile(path, view),
        toJavaScriptFile(path, view)
      ]);
    }

    return Promise.all(promises);
  }));
}

module.exports(resolve(__dirname, 'views'));