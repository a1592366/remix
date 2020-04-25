const events = [
  { name: 'onTouchStart', type: 'String', alias: 'bind:touchstart', defaultValue: 'null' },
  { name: 'onTouchMove', type: 'String', alias: 'bind:touchmove', defaultValue: 'null' },
  { name: 'onTouchCancel', type: 'String', alias: 'bind:touchcancel', defaultValue: 'null' },
  { name: 'onTouchEnd', type: 'String', alias: 'bind:touchend', defaultValue: 'null' },
  { name: 'onTap', type: 'String', alias: 'bind:tap', defaultValue: 'null' },
  { name: 'onLongPress', type: 'String', alias: 'bind:longpress', defaultValue: 'null' },
  { name: 'onLongTap', type: 'String', alias: 'bind:longtap', defaultValue: 'null' },
  { name: 'onTouchForceChange', type: 'String', alias: 'bind:touchforcechange', defaultValue: 'null' },
  { name: 'onTransitionEnd', type: 'String', alias: 'bind:transitionend', defaultValue: 'null' },
  { name: 'onAnimationStart', type: 'String', alias: 'bind:animationstart', defaultValue: 'null' },
  { name: 'onAnimationIteration', type: 'String', alias: 'bind:animationiteration', defaultValue: 'null' },
  { name: 'onAnimationEnd', type: 'String', alias: 'bind:animationend', defaultValue: 'null' },
].map((event) => {
  event.isEvent = true;
  event.camel = event.name;

  return event;
});

module.exports = events;