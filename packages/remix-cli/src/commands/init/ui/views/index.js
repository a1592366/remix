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
const video = require('./video');
const textarea = require('./textarea');
const editor = require('./editor');
const slider = require('./slider');
const audio = require('./audio');
const canvas = require('./canvas');

module.exports = {
  view,
  text,
  picker,
  video,
  'scroll-view': scrollView,
  swiper,
  'swiper-item': swiperItem,
  map,
  image,
  button,
  input,
  textarea,
  editor,
  slider,
  audio,
  canvas
}