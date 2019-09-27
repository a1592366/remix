const path = require('path');

module.exports = function (tagName, model) {
  const { type } = model;

  const Class = require(path.resolve(__dirname, 'classes', type));
  const instance = new Class(tagName, model);

  return instance.render();
}