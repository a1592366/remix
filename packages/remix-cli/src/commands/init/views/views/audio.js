const types = require('../types');

module.exports = {
  type: types.CONDITIONAL,
  openning: false,

  conditions: [
    { name: 'timeupdate' }
  ],

  events: [
    { name: 'pause' },
    { name: 'error' },
    { name: 'play' },
    { name: 'ended' }
  ],

  props: [
    { name: 'src' },
    { name: 'loop' },
    { name: 'poster' },
    { name: 'controls' },
    { name: 'name' },
    { name: 'author' },
  ]
}