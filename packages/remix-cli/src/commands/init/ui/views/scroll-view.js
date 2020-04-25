const wrap = require('../wrap');

module.exports = wrap({
  name: 'scroll-view',
  open: true,
  worker: true,
  properties: [
    { name: 'scroll-x', type: 'Boolean', defaultValue: 'false' },
    { name: 'scroll-y', type: 'Boolean', defaultValue: 'false' },
    { name: 'upper-threshold', type: 'Number', defaultValue: '50' },
    { name: 'lower-threshold', type: 'Number', defaultValue: '50' },
    { name: 'scroll-top', type: 'Number', defaultValue: 'null' },
    { name: 'scroll-left', type: 'Number', defaultValue: 'null' },
    { name: 'scroll-into-view', type: 'String', defaultValue: 'null' },
    { name: 'scroll-with-animation', type: 'Boolean', defaultValue: 'false' },
    { name: 'enable-back-to-top', type: 'Boolean', defaultValue: 'false' },
    { name: 'enable-flex', type: 'Boolean', defaultValue: 'false' },
    { name: 'scroll-anchoring', type: 'Boolean', defaultValue: 'false' },
  ],

  events: [
    { name: 'onScrollToUpper', type: 'String', defaultValue: 'null', alias: 'bindscrolltoupper' },
    { name: 'onScrollToLower', type: 'String', defaultValue: 'null', alias: 'bindscrolltolower' },
    { name: 'onScroll', type: 'String', defaultValue: 'null', alias: 'bindscroll' },
  ]
})