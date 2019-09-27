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
    { name: 'waiting' },
    { name: 'progress' },
    { name: 'fullscreenchange' },
    { name: 'ended' },
    { name: 'pause' },
    { name: 'play' }
  ],

  props: [
    { name: 'src' },
    { name: 'duration' },
    { name: 'danmu-list' },
    { name: 'danmu-btn', value: 'danmuButton' },
    { name: 'enable-danmu' },
    { name: 'autoplay' }, 
    { name: 'loop' }, 
    { name: 'muted' },
    { name: 'initial-time' },
    { name: 'page-gesture' },
    { name: 'page-gesture' },
    { name: 'direction' },
    { name: 'show-fullscreen-btn', value: 'showFullscreenButton' },
    { name: 'show-play-btn', value: 'showPlayButton' },
    { name: 'show-center-play-btn', value: 'showCenterPlayButton' },
    { name: 'enable-progress-gesture' },
    { name: 'object-fit' },
    { name: 'show-mute-btn', value: 'showMuteButton' },
    { name: 'title' },
    { name: 'play-btn-position', value: 'playButtonPosition' },
    { name: 'enable-play-gesture' },
    { name: 'auto-pause-if-navigate' },
    { name: 'auto-pause-if-open-native' },
    { name: 'vslide-gesture' },
    { name: 'vslide-gesture-in-fullscreen' },
    { name: 'poster' },
    { name: 'controls' }
  ]
}
