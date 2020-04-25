const views = require('../views');
const copy = require('../../../../shared/copy');
const keys = Object.keys(views);

module.exports = async function (dist) {
  const imports = keys.filter(key => {
    if (key === 'view' || key === 'text') {
      return false;
    } else {
      return true;
    } 
  }).map(key => {
    const view = views[key];

    return `<import src="../remix-${view.name}/index.wxml" />`;
  }).join('\n');

  const switcher = keys.map(key => {
    const view = views[key]
    if (1) {

    } else {
      return `<block wx:elif="{{ element.tagName == '${view.name}' }}">\n\t\t<template is="${view.name}" data="{{ ...element }}" />\n\t</block>`;
    }
  }).join('');

  const components = keys.map(key => {
    const view = views[key];
    const { name } = view;

    if (
      name === 'view' ||
      name === 'text'
    ) {
      const props = view.properties.map(props => {
        const { name, camel } = props;
        const line = [name, `"{{element.${camel}}}"`];
        
        if (name === 'uuid') {
          line[0] = 'id';
        } else if (name === 'className') {
          line[0] = 'class';
        }

        return line.join('=')
      }).join(' ');

      return `<block wx:elif="{{ element.tagName == '${name}' }}">\n\t\t<${name} ${props} />\n\t</block>`;
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
    components
  });
}