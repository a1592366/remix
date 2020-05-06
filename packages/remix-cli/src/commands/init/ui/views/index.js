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
  // html
  // section: { ...view, name: 'section' },
  // nav: { ...view, name: 'nav' },
  // h1: { ...view, name: 'h1' },
  // h2: { ...view, name: 'h2' },
  // h3: { ...view, name: 'h3' },
  // h4: { ...view, name: 'h4' },
  // h5: { ...view, name: 'h5' },
  // h6: { ...view, name: 'h6' },
  // header: { ...view, name: 'header' },
  // footer: { ...view, name: 'footer' },
  // div: { ...view, name: 'div' },
  // p: { ...view, name: 'p' },
  // ol: { ...view, name: 'ol' },
  // ul: { ...view, name: 'ul' },
  // li: { ...view, name: 'li' },
  // i: { ...text, name: 'i' },
  // span: { ...text, name: 'span' },
  // b: { ...text, name: 'b' },
  // strong: { ...text, name: 'strong' },
  // em: { ...text, name: 'em' },
  // img: { ...image, name: 'img' },

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