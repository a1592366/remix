const wrap = require('../wrap');

module.exports = wrap({
  name: 'input',
  open: false,
  wrapper: false,
  properties: [
    { name: 'value', type: 'String', defaultValue: 'null' },
    { name: 'type', type: 'String', defaultValue: '\'text\'' },
    { name: 'password', type: 'Boolean', defaultValue: 'false' },
    { name: 'placeholder', type: 'String', defaultValue: 'null' },
    { name: 'placeholder-style', type: 'String', defaultValue: 'null' },
    { name: 'placeholder-class', type: 'String', defaultValue: '\'input-placeholder\'' },
    { name: 'disabled', type: 'Boolean', defaultValue: 'false' },
    { name: 'maxlength', type: 'Number', defaultValue: '140' },
    { name: 'cursor-spacing', type: 'Number', defaultValue: '0' },
    { name: 'auto-focus', type: 'Boolean', defaultValue: 'false' },
    { name: 'focus', type: 'Boolean', defaultValue: 'false' },
    { name: 'confirm-type', type: 'String', defaultValue: '\'done\'' },
    { name: 'confirm-hold', type: 'Boolean', defaultValue: 'false' },
    { name: 'cursor', type: 'Number', defaultValue: '0' },
    { name: 'selection-start', type: 'Number', defaultValue: '-1' },
    { name: 'selection-end', type: 'Number', defaultValue: '-1' },
    { name: 'adjust-position', type: 'Boolean', defaultValue: 'true' },
    { name: 'hold-keyboard', type: 'Boolean', defaultValue: 'false' },
  ],

  events: [
    { name: 'onInput', type: 'String', defaultValue: 'null', alias: 'bindinput' },
    { name: 'onFocus', type: 'String', defaultValue: 'null', alias: 'bindfocus' },
    { name: 'onBlur', type: 'String', defaultValue: 'null', alias: 'bindblur' },
    { name: 'onConfirm', type: 'String', defaultValue: 'null', alias: 'bindconfirm' },
    { name: 'onKeyboardHeightChange', type: 'String', defaultValue: 'null', alias: 'bindkeyboardheightchange' },
  ]
})