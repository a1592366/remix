const Conditional = require('./Condational');
const types = require('../../types');

module.exports = class Swiper extends Conditional {
  constructor (...argv) {
    super(...argv);

    this.type = types.SWIPER;
  }
}