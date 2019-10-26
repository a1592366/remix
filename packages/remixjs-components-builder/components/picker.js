module.exports = {
  name: 'picker',
  open: false,
  properties: [
    { name: 'mode', type: 'String', defaultValue: 'selector' },
    { name: 'disabled', type: 'Boolean', defaultValue: 'false' },
    { name: 'range', type: 'Object', defaultValue: '[]' },
    { name: 'range-key', type: 'String', defaultValue: 'null' },
    { name: 'value', type: 'Number', defaultValue: '0' },
    { name: 'start', type: 'String', defaultValue: 'null' },
    { name: 'end', type: 'String', defaultValue: 'null' },
    { name: 'fields', type: 'String', defaultValue: '\'day\'' },
    { name: 'custom-item', type: 'String', defaultValue: 'null' },
  ],

  events: [
    { name: 'onCancel', type: 'String', defaultValue: 'null', alias: 'bindcancel' },
    { name: 'onError', type: 'String', defaultValue: 'null', alias: 'binderror' },
    { name: 'onChange', type: 'String', defaultValue: 'null', alias: 'bindchange' },
    { name: 'onColumnChange', type: 'String', defaultValue: 'null', alias: 'bindcolumnchange' },
  ]
}