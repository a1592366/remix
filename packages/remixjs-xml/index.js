const fs = require('fs-extra');
const path = require('path');
const models = require('./models');
const renderer = require('./renderer');
const { getOwnPropertyNames: getPropertyKeys } = Object;



module.exports = {
  async build (dist) {
    const tagNames = getPropertyKeys(models);

    if (!await fs.exists(dist)) {
      await fs.mkdirp(dist);
    }

    
  
    await Promise.all(tagNames.map(tagName => {
      const model = models[tagName];
  
      return {
        tagName,
        template: renderer(tagName, model)
      }
    }).map(({ tagName, template }) => {
      return fs.writeFile(path.resolve(dist, `${tagName}.wxml`), template);
    }))
  }
}





