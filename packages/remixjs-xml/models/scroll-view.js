  
const types = require('../types');

module.exports = {
  type: types.SCROLL_VIEW,
  openning: true,

  tagName: 'scroll-view',

  conditions: [
    { name: 'scroll' },
  ],

  events: [
    { name: 'scrolltoupper' },
    { name: 'scrolltolower' },
  ],

  props: [
    { name: 'scroll-x' },
    { name: 'scroll-y' },
    { name: 'upper-threshold' },
    { name: 'lower-threshold' },
    { name: 'scroll-top' },
    { name: 'scroll-left' },
    { name: 'scroll-into-view' },
    { name: 'scroll-with-animation' },
    { name: 'enable-back-to-top' }
  ]
}
