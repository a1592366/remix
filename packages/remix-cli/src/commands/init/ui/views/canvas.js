const wrap = require('../wrap');

module.exports = wrap({
  name: 'canvas',
  open: false,
  worker: false,
  properties: [
    { name: 'type', type: 'String', defaultValue: '2d' },
    { name: 'canvas-id', type: 'String', defaultValue: 'null' },
    { name: 'webp', type: 'Boolean', defaultValue: 'false' },
    { name: 'disable-scroll', type: 'Boolean', defaultValue: 'false' }
  ],

  events: []
})