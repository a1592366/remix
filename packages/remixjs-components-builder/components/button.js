module.exports = {
  name: 'button',
  open: true,
  properties: [
    { name: 'size', type: 'String', defaultValue: '\'default\'' },
    { name: 'type', type: 'String', defaultValue: '\'default\'' },
    { name: 'plain', type: 'Boolean', defaultValue: 'false' },
    { name: 'disabled', type: 'Boolean', defaultValue: 'false' },
    { name: 'loading', type: 'Boolean', defaultValue: 'false' },
    { name: 'form-type', type: 'String', defaultValue: 'null' },
    { name: 'open-type', type: 'String', defaultValue: 'null' },
    { name: 'hover-class', type: 'String', defaultValue: '\'button-hover\'' },
    { name: 'hover-stop-propagation', type: 'Boolean', defaultValue: 'false' },
    { name: 'hover-start-time', type: 'Number', defaultValue: '20' },
    { name: 'hover-stay-time', type: 'Number', defaultValue: '70' },
    { name: 'lang', type: 'String', defaultValue: '\'en\'' },
    { name: 'session-from', type: 'String', defaultValue: 'null' },
    { name: 'send-message-title', type: 'String', defaultValue: 'null' },
    { name: 'send-message-path', type: 'String', defaultValue: 'null' },
    { name: 'send-message-img', type: 'String', defaultValue: 'null' },
    { name: 'app-parameter', type: 'String', defaultValue: 'null' },
    { name: 'show-message-card', type: 'String', defaultValue: 'null' },
  ],

  events: [
    { name: 'onGetUserInfo', type: 'String', defaultValue: 'null', alias: 'bindgetuserinfo' },
    { name: 'onContact', type: 'String', defaultValue: 'null', alias: 'bindcontact' },
    { name: 'onGetPhoneNumber', type: 'String', defaultValue: 'null', alias: 'bindgetphonenumber' },
    { name: 'onOpenSetting', type: 'String', defaultValue: 'null', alias: 'bindopensetting' },
    { name: 'onLaunchApp', type: 'String', defaultValue: 'null', alias: 'bindlaunchapp' },
    { name: 'onError', type: 'String', defaultValue: 'null', alias: 'binderror' },
  ]
}