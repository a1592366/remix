const wrap = require('../wrap');

module.exports = wrap({
  name: 'audio',
  open: false,
  properties: [
    { name: 'id', type: 'String', defaultValue: 'null' },
    { name: 'src', type: 'String', defaultValue: 'null' },
    { name: 'loop', type: 'Boolean', defaultValue: 'false' },
    { name: 'controls', type: 'Boolean', defaultValue: 'true' },
    { name: 'poster', type: 'String', defaultValue: 'null' },
    { name: 'name', type: 'String', defaultValue: 'null' },
    { name: 'author', type: 'String', defaultValue: 'null' },
  ],

  events: [
    { name: 'onError', type: 'String', defaultValue: 'null', alias: 'bind:error' },
    { name: 'onPlay', type: 'String', defaultValue: 'null', alias: 'bind:play' },
    { name: 'onPause', type: 'String', defaultValue: 'null', alias: 'bind:pause' },
    { name: 'onTimeUpdate', type: 'String', defaultValue: 'null', alias: 'bind:timeupdate' },
    { name: 'onEnded', type: 'String', defaultValue: 'null', alias: 'bind:ended' },
  ]
})