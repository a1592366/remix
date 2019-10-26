module.exports = {
  name: 'image',
  open: false,
  properties: [
    { name: 'src', type: 'String', defaultValue: 'null' },
    { name: 'mode', type: 'String', defaultValue: '\'scaleToFill\'' },
    { name: 'webp', type: 'Boolean', defaultValue: 'false' },
    { name: 'lazy-load', type: 'Boolean', defaultValue: 'false' },
    { name: 'show-menu-by-longpress', type: 'Boolean', defaultValue: 'false' },
  ],

  events: [
    { name: 'onLoad', type: 'String', defaultValue: 'null', alias: 'bindload' },
    { name: 'onError', type: 'String', defaultValue: 'null', alias: 'binderror' },
  ]
}