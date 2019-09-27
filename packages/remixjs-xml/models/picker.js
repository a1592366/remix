  
const types = require('../types');

module.exports = {
  type: types.PICKER,
  openning: true,

  events: [
    { name: 'change' },
    { name: 'cancel' }
  ],

  props: [
    { name: 'range' },
    { name: 'range-key' },
    { name: 'value' },
    { name: 'disable' }
  ]
}