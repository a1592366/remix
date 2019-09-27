const types = require('../types');

module.exports = {
  type: types.CONDITIONAL,
  openning: false,

  conditions: [
    { name: 'load' }
  ],

  events: [
    { name: 'error' }
  ],

  props: [
    { name: 'src' },
    { name: 'mode' },
    { name: 'lazy-load' },
    { name: 'mode' },
  ]
};