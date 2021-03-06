const wrap = require('../wrap');

module.exports = wrap({
  name: 'video',
  open: false,
  properties: [
    { name: 'src', type: 'String', defaultValue: 'null' },
    { name: 'duration', type: 'Number', defaultValue: 'null' },
    { name: 'controls', type: 'Boolean', defaultValue: 'true' },
    { name: 'danmu-list', type: 'Array', defaultValue: 'null' },
    { name: 'danmu-btn', type: 'Boolean', defaultValue: 'false', fullname: 'danmu-button' },
    { name: 'enable-danmu', type: 'Boolean', defaultValue: 'false' },
    { name: 'autoplay', type: 'Boolean', defaultValue: 'false' },
    { name: 'loop', type: 'Boolean', defaultValue: 'false' },
    { name: 'muted', type: 'Boolean', defaultValue: 'false' },
    { name: 'initial-time', type: 'Number', defaultValue: '0' },
    { name: 'page-gesture', type: 'Boolean', defaultValue: 'false' },
    { name: 'direction', type: 'Number', defaultValue: 'null' },
    { name: 'show-progress', type: 'Boolean', defaultValue: 'true' },
    { name: 'show-fullscreen-btn', type: 'Boolean', defaultValue: 'true', fullname: 'show-fullscreen-button' },
    { name: 'show-play-btn', type: 'Boolean', defaultValue: 'true', fullname: 'show-play-button' },
    { name: 'show-center-play-btn', type: 'Boolean', defaultValue: 'true', fullname: 'show-center-play-button' },
    { name: 'enable-progress-gesture', type: 'Boolean', defaultValue: 'true' },
    { name: 'object-fit', type: 'Boolean', defaultValue: '0' },
    { name: 'poster', type: 'String', defaultValue: 'null' },
    { name: 'show-mute-btn', type: 'Boolean', defaultValue: 'false', fullname: 'show-mute-button' },
    { name: 'title', type: 'String', defaultValue: 'null' },
    { name: 'play-button-position', type: 'String', defaultValue: '\'bottom\'' },
    { name: 'enable-play-gesture', type: 'Boolean', defaultValue: 'false' },
    { name: 'auto-pause-if-navigate', type: 'Boolean', defaultValue: 'true' },
    { name: 'auto-pause-if-open-native', type: 'Boolean', defaultValue: 'true' },
    { name: 'vslide-gesture', type: 'Boolean', defaultValue: 'true' },
    { name: 'vslide-gesture-in-fullscreen', type: 'Boolean', defaultValue: 'true' },
    { name: 'ad-unit-id', type: 'String', defaultValue: 'null' },
  ],

  events: [
    { name: 'onPlay', type: 'String', defaultValue: 'null', alias: 'bind:play' },
    { name: 'onPause', type: 'String', defaultValue: 'null', alias: 'bind:pause' },
    { name: 'onEnded', type: 'String', defaultValue: 'null', alias: 'bind:ended' },
    { name: 'onTimeUpdate', type: 'String', defaultValue: 'null', alias: 'bind:timeupdate' },
    { name: 'onFullScreenChange', type: 'String', defaultValue: 'null', alias: 'bind:fullscreenchange' },
    { name: 'onWaiting', type: 'String', defaultValue: 'null', alias: 'bind:waiting' },
    { name: 'onError', type: 'String', defaultValue: 'null', alias: 'bind:error' },
    { name: 'onProgress', type: 'String', defaultValue: 'null', alias: 'bind:progress' },
    { name: 'onLoadedMetaData', type: 'String', defaultValue: 'null', alias: 'bind:loadedmetadata' },
  ]
})