const Default = require('./Default');
const types = require('../../types');

module.exports = class Text extends Default {
  constructor (...argv) {
    super(...argv);
    this.type = types.TEXT;
  }
}
