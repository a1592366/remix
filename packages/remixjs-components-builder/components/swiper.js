module.exports = {
  name: 'swiper',
  open: true,
  properties: [
    { name: 'indicator-dots', type: 'Boolean', defaultValue: 'false' },
    { name: 'indicator-color', type: 'String', defaultValue: '\'rgba(0, 0, 0, .3)\'' },
    { name: 'indicator-active-color', type: 'String', defaultValue: '\'#000000\'' },
    { name: 'autoplay', type: 'Boolean', defaultValue: 'false' },
    { name: 'current', type: 'Number', defaultValue: '0' },
    { name: 'interval', type: 'Number', defaultValue: '5000' },
    { name: 'duration', type: 'Number', defaultValue: '500' },
    { name: 'circular', type: 'Boolean', defaultValue: 'false' },
    { name: 'vertical', type: 'Boolean', defaultValue: 'false' },
    { name: 'previous-margin', type: 'String', defaultValue: '\'0px\'' },
    { name: 'next-margin', type: 'String', defaultValue: '\'0px\'' },
    { name: 'display-multiple-items', type: 'Number', defaultValue: '1' },
    { name: 'skip-hidden-item-layou', type: 'Boolean', defaultValue: 'false' },
    { name: 'easing-function', type: 'String', defaultValue: '\'default\'' },
    
  ],

  events: [
    { name: 'onChange', type: 'String', defaultValue: 'null', alias: 'bindchange' },
    { name: 'onAnimationFinish', type: 'String', defaultValue: 'null', alias: 'bindanimationfinish' },
  ]
}