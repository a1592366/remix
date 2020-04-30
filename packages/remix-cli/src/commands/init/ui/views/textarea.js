const wrap = require('../wrap');

module.exports = wrap({
  name: 'textarea',
  open: false,
  worker: false,
  wrapper: false,
  properties: [
    { name: 'value', type: 'String', defaultValue: 'null' },
    { name: 'placeholder', type: 'String', defaultValue: 'null' },
    { name: 'placeholder-style', type: 'String', defaultValue: 'null' },
    { name: 'placeholder-class', type: 'String', defaultValue: '\'input-placeholder\'' },
    { name: 'disabled', type: 'Boolean', defaultValue: 'false' },
    { name: 'maxlength', type: 'Number', defaultValue: '140' },
    { name: 'auto-focus', type: 'Boolean', defaultValue: 'false' },
    { name: 'focus', type: 'Boolean', defaultValue: 'false' },
    { name: 'auto-height', type: 'Boolean', defaultValue: 'false' },
    { name: 'fixed', type: 'Boolean', defaultValue: 'false' },
    { name: 'cursor-spacing', type: 'Number', defaultValue: '0' },
    { name: 'cursor', type: 'Number', defaultValue: '0' },
    { name: 'show-confirm-bar', type: 'Boolean', defaultValue: 'false' },
    { name: 'selection-start', type: 'Number', defaultValue: '-1' },
    { name: 'selection-end', type: 'Number', defaultValue: '-1' },
    { name: 'adjust-position', type: 'Boolean', defaultValue: 'true' },
    { name: 'hold-keyboard', type: 'Boolean', defaultValue: 'false' },
    { name: 'disable-default-padding', type: 'Boolean', defaultValue: 'false' }
  ],

  events: [
    { name: 'onFocus', type: 'String', defaultValue: 'null', alias: 'bindfocus' },
    { name: 'onBlur', type: 'String', defaultValue: 'null', alias: 'bindblur' },
    { name: 'onLineChange', type: 'String', defaultValue: 'null', alias: 'bindlinechange' },
    { name: 'onInput', type: 'String', defaultValue: 'null', alias: 'bindinput' },
    { name: 'onConfirm', type: 'String', defaultValue: 'null', alias: 'bindconfirm' },
    { name: 'onKeyboardHeightChange', type: 'String', defaultValue: 'null', alias: 'bindkeyboardheightchange' },
  ]
})