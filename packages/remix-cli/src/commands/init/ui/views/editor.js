const wrap = require('../wrap');

module.exports = wrap({
  name: 'editor',
  open: false,
  worker: false,
  properties: [
    { name: 'read-only', type: 'Boolean', defaultValue: 'false' },
    { name: 'placeholder', type: 'String', defaultValue: 'null' },
    { name: 'show-img-size', type: 'Boolean', defaultValue: 'false' },
    { name: 'show-img-toolbar', type: 'Boolean', defaultValue: 'false' },
    { name: 'show-img-resize', type: 'Boolean', defaultValue: 'false' }
  ],

  events: [
    { name: 'onFocus', type: 'String', defaultValue: 'null', alias: 'bindfocus' },
    { name: 'onBlur', type: 'String', defaultValue: 'null', alias: 'bindblur' },
    { name: 'onInput', type: 'String', defaultValue: 'null', alias: 'bindinput' },
    { name: 'onReady', type: 'String', defaultValue: 'null', alias: 'bindready' },
    { name: 'onStatusChange', type: 'String', defaultValue: 'null', alias: 'bindstatuschange' },
  ]
})