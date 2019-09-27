module.exports = [
  // View Canvas
  { name: 'touchstart', short: 'ts', method: 'onTouchStart', bubble: true },
  { name: 'touchmove', short: 'tm', method: 'onTouchMove', bubble: true },
  { name: 'touchend', short: 'te', method: 'onTouchEnd', bubble: true },
  { name: 'touchcancel', short: 'tc', method: 'onTouchCancel', bubble: true },
  
  // View
  { name: 'tap', short: 'tp', method: 'onTap',  bubble: true },
  { name: 'longtap', short: 'lp', method: 'onLongTap', bubble: true },
  
  // Animation
  { name: 'transitionend', short: 'tre', method: 'onTransitionEnd', bubble: true },
  { name: 'transition', short: 'tr', method: 'onTransition', bubble: true },
  { name: 'animationstart', short: 'as', method: 'onAnimationStart', bubble: true },
  { name: 'animationiteration', short: 'ai', method: 'onAnimationIteration', bubble: true },
  { name: 'animationend', short: 'ae', method: 'onAnimationEnd', bubble: true },
  
  { name: 'touchforcechange', short: 'tfc', method: 'onTouchforceChange', bubble: true },
  
  // Input TextArea
  { name: 'input', short: 'ip', method: 'onInput' },
  { name: 'blur', short: 'br', method: 'onBlur' },
  { name: 'focus', short: 'fs', method: 'onFocus' },
  { name: 'change', short: 'cg', method: 'onChange' },
  { name: 'confirm', short: 'cfm', method: 'onConfirm' },
  { name: 'submit', short: 'sm', method: 'onSubmit' },
  { name: 'cancel', short: 'cc', method: 'onCancel' },
  
  // Video Audio
  { name: 'statchange', short: 'scg', method: 'onStateChange' },
  { name: 'fullscreenchange', short: 'fsc', method: 'onFullScreenChange' },
  { name: 'netstatus', short: 'ns', method: 'onNetStatus' },
  { name: 'error', short: 'e', method: 'onError' },
  { name: 'play', short: 'pl', method: 'onPlay' },
  { name: 'pause', short: 'pa', method: 'onPause' },
  { name: 'stop', short: 's', method: 'onStop' },
  { name: 'ended', short: 'ed', method: 'onEnded' },
  { name: 'scancode', short: 'sc', method: 'onScanCode' },
  { name: 'timeupdate', short: 'tu', method: 'onTimeUpdate' },
  { name: 'waiting', short: 'wt', method: 'onWaiting' },
  { name: 'progress', short: 'pg', method: 'onProgress' },
  
  // Map
  { name: 'markertap', short: 'mt', method: 'onMarkerTap' },
  { name: 'callouttap', short: 'clt', method: 'onCalloutTap' },
  { name: 'controltap', short: 'ctt', method: 'onCalloutTap' },
  { name: 'regionchange', short: 'rcg', method: 'onRegionchange' },
  { name: 'updated', short: 'ud', method: 'onUpdated' },
  { name: 'poitap', short: 'pt', method: 'onPoitap' },


  { name: 'message', short: 'mg', method: 'onMessage' },
  { name: 'load', short: 'l', method: 'onLoad' },
  { name: 'activeend', short: 'ad', method: 'onActiveEnd' },
  
  // Button
  { name: 'contact', short: 'ct', method: 'onContact' },
  { name: 'getphonenumber', short: 'gpn', method: 'onGetPhoneNumber' },
  
  // Navigator
  { name: 'success', short: 'su', method: 'onSuccess' },
  { name: 'fail', short: 'fl', method: 'onFail' },
  { name: 'complete', short: 'cp', method: 'onComplete' },

  { name: 'launchapp', short: 'la', method: 'onLaunchApp' },
  { name: 'opensetting', short: 'os', method: 'onOpenSetting' },
  { name: 'reset', short: 'rs', method: 'onReset' },
  
  // Picker
  { name: 'pickstart', short: 'ps', method: 'onPickStart' },
  { name: 'pickend', short: 'pe', method: 'onPickEnd' },
  { name: 'changing', short: 'cgi', method: 'onChanging' },
  { name: 'linechange', short: 'lc', method: 'onLineChange' },

  // scroll-view
  { name: 'scrolltoupper', short: 'stu', method: 'onScrollToUpper' },
  { name: 'scrolltolower', short: 'stl', method: 'onScrollToLower' },
  { name: 'scroll', short: 'srl', method: 'onScroll' }
];
