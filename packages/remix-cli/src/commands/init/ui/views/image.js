const wrap = require('../wrap');

module.exports = wrap({
  name: 'image',
  open: false,
  worker: false,
  properties: [
    { name: 'src', type: 'String', defaultValue: 'null' },
    { name: 'mode', type: 'String', defaultValue: '\'scaleToFill\'' },
    { name: 'webp', type: 'Boolean', defaultValue: 'false' },
    { name: 'lazy-load', type: 'Boolean', defaultValue: 'false' },
    { name: 'show-menu-by-longpress', type: 'Boolean', defaultValue: 'false' },
  ],

  events: [
    { name: 'onLoad', type: 'String', defaultValue: 'null', alias: 'bind:load' },
    { name: 'onError', type: 'String', defaultValue: 'null', alias: 'bind:error' },
  ]
})