const Default = require('./Default');
const types = require('../../types');

module.exports = class PickerView extends Default {
  constructor (...argv) {
    super(...argv);
    this.type = types.PICKER_VIEW;
  }
}