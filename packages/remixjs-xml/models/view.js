const types = require('../types');

module.exports = {
  type: types.CONDITIONAL,
  openning: false,

  conditions: [
    { name: 'touchstart', type: 'catch' },
    { name: 'touchmove', type: 'catch' },
    { name: 'touchend', type: 'catch' },
    { name: 'tap', type: 'catch' },
    { name: 'longtap', type: 'catch' }
  ],

  events: [],

  props: []
};