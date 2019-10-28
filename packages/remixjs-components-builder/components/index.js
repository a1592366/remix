const image = require('./image');
const button = require('./button');
const map = require('./map');
const input = require('./input');
const picker = require('./picker');
const view = require('./view');
const text = require('./text');
const scrollView = require('./scroll-view');
const swiper = require('./swiper');
const swiperItem  = require('./swiper-item');
const root = require('./root');

module.exports = {
  root,
  view,
  text,
  picker,
  'scroll-view': scrollView,
  swiper,
  'swiper-item': swiperItem,
  map,
  image,
  button,
  input,
}