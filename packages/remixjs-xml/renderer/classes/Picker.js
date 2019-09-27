const Default = require('./Default');
const types = require('../../types');

module.exports = class Picker extends Default {
  constructor (...argv) {
    super(...argv);
    this.type = types.PICKER;
  }
}