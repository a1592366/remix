const fs = require('fs-extra');
const path = require('path');
const models = require('./models');
const renderer = require('./renderer');
const { getOwnPropertyNames: getPropertyKeys } = Object;



module.exports = function create (dist = __dirname) {
  const tagNames = getPropertyKeys(models);

  tagNames.map(tagName => {
    const model = models[tagName];

    return {
      tagName,
      template: renderer(tagName, model)
    }
  }).map(({ tagName, template }) => {
    fs.writeFileSync(path.resolve(dist, `${tagName}.wxml`), template);
  });
}





