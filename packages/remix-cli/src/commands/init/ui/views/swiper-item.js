const wrap = require('../wrap');

module.exports = wrap({
  name: 'swiper-item',
  open: true,
  worker: true,
  properties: [
    { name: 'item-id', type: 'String', defaultValue: 'null' },
  ],

  events: []
})