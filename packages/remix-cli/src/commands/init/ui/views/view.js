const wrap = require('../wrap');

module.exports = wrap({
  name: 'view',
  open: true,
  worker: true,
  replace: true,
  properties: [
    { name: 'hover-class', type: 'String', defaultValue: '\'none\'' },
    { name: 'hover-stop-propagation', type: 'Boolean', defaultValue: 'false' },
    { name: 'hover-start-time', type: 'Number', defaultValue: '50' },
    { name: 'hover-stay-time', type: 'Number', defaultValue: '400' },
  ],

  events: []
})