const wrap = require('../wrap');

module.exports = wrap({
  name: 'slider',
  open: false,
  worker: false,
  properties: [
    { name: 'min', type: 'Number', defaultValue: '0' },
    { name: 'max', type: 'Number', defaultValue: '100' },
    { name: 'step', type: 'Number', defaultValue: '1' },
    { name: 'disabled', type: 'Boolean', defaultValue: 'false' },
    { name: 'value', type: 'Number', defaultValue: '0' },
    { name: 'color', type: 'String', defaultValue: '#e9e9e9' },
    { name: 'selected-color', type: 'String', defaultValue: '#1aad19' },
    { name: 'backgroundColor', type: 'String', defaultValue: '#e9e9e9' },
    { name: 'activeColor', type: 'String', defaultValue: '#1aad19' },
    { name: 'block-size', type: 'Number', defaultValue: '28' },
    { name: 'block-color', type: 'String', defaultValue: '#ffffff' },
    { name: 'show-value', type: 'Boolean', defaultValue: 'false' },
  ],

  events: [
    { name: 'onChange', type: 'String', defaultValue: 'null', alias: 'bindchange' },
    { name: 'onChanging', type: 'String', defaultValue: 'null', alias: 'bindchanging' },
  ]
})