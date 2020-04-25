const wrap = require('../wrap');

module.exports = wrap({
  name: 'text',
  open: true,
  worker: true,
  replace: true,
  properties: [
    { name: 'selectable', type: 'Boolean', defaultValue: 'false' },
    { name: 'space', type: 'Boolean', defaultValue: 'false' },
    { name: 'decode', type: 'Boolean', defaultValue: 'false' }
  ],

  events: []
})