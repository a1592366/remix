const fs = require('fs-extra');
const path = require('path');

const views = require('./views');
const renderer = require('./renderer');


const keys = Object.keys;

module.exports = async function create (dist) {
  const tagNames = keys(views);

  if (!await fs.exists(dist)) {
    await fs.mkdirp(dist);
  }

  await Promise.all(tagNames.map(tagName => {
    const view = views[tagName];

    return {
      tagName,
      template: renderer(tagName, view)
    }
  }).map(({ tagName, template }) => {
    return fs.writeFile(
      path.resolve(dist, `${tagName}.wxml`), 
      template
    );
  }))
}

