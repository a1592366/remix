const path = require('path');

const names = [
  'text',
  'audio',
  'image',
  'video',
  'picker',
  'picker-view',
  'scroll-view',
];

names.forEach(name => {
  module.exports[name] = require(path.resolve(__dirname, name));
});