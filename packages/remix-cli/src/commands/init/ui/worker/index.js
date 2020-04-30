const views = require('../views');
const events = require('../events');
const copy = require('../../../../shared/copy');
const keys = Object.keys(views);

// const replace = `view text input textarea`.split(' ');
// const wrapper = `input textarea`.split(' ');

const replace = ['view', 'text'];
const wrapper = [];

module.exports = async function (dist) {
  const imports = keys.filter(key => {
    if (replace.includes(key)) {
      return false;
    } else {
      return true;
    } 
  }).map(key => {
    const view = views[key];

    return `<import src="../remix-${view.name}/index.wxml" />`;
  }).join('\n');

  const switcher = keys.map(key => {
    const view = views[key];
    const { name } = view;

    if (replace.includes(name)) {
      let properties = view.properties.concat(events, view.events);

      let props = properties.map(props => {
        const { name, camel, alias, isEvent } = props;
        const line = [
          wrapper.includes(view.name) ? camel : alias,
          `"{{element.${camel}}}"`
        ];

        
        if (name === 'uuid') {
          line[0] = 'id';
        } else if (name === 'className') {
          line[0] = 'class';
        }

        return line.join('=')
      })

      if (wrapper.includes(name)) {
        props.push(`uuid="{{element.uuid}}"`);
      }

      props = props.join(' ');

      const tagName = wrapper.includes(name) ? `remix-${name}` : name;

      return `<block wx:elif="{{ element.tagName == '${name}' }}">\n\t\t<${tagName} ${props} />\n\t</block>`;
    } else {
      return `<block wx:elif="{{ element.tagName == '${name}' }}">\n\t\t<template is="${name}" data="{{ ...element }}" />\n\t</block>`
    }
  }).join('\n\t');

  await copy(
    __dirname,
    dist,
    ['./remix-worker.wxml']
  )({
    imports,
    switcher,
  });
}