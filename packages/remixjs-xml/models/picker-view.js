  
const types = require('../types');

module.exports = {
  type: types.PICKER_VIEW,
  openning: true,

  tagName: 'picker-view',

  events: [
    { name: 'pickstart' },
    { name: 'pickend' },
    { name: 'change' }
  ],

  props: [
    { name: 'value' },
    { name: 'indicator-style' },
    { name: 'indicator-class' },
    { name: 'mask-style' },
    { name: 'mask-class' }
  ]
}
