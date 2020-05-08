import {
  INTERNAL_EVENT_HANDLERS_KEY
} from './RemixShared';
import {
  TAG_NAME
} from './RemixViewController';

const HTMLBubbleEvents = [
  'touchstart',
  'touchmove',
  'touchcancel',
  'touchend',
  'tap',
  'longpress',
  'longtap',
  'touchforcechange',
  'transitionend',
  'animationstart',
  'animationiteration',
  'animationend'
];

const HTMLDefaultBehaviorsTags = [
  'a'
];

const HTMLAliasEventMap = {
  onTap: 'onClick'
}

class ViewEvent {
  constructor (target, event, currentTarget) {
    this.nativeEvent = event;
    const { type, detail, touches, timeStamp, changedTouches } = event;

    this.type = type;
    this.touches = touches;
    this.timeStamp = timeStamp;
    this.changedTouches = changedTouches;
    this.bubbles = HTMLBubbleEvents.includes(this.type);
    this.cancelBubble = false;
    this.isPreventDefault = false;
    this.detail = detail;
    this.target = target;
    this.currentTarget = currentTarget || target;
  }

  stopPropagation () {
    this.cancelBubble = true;
  }

  preventDefault () {
    this.isPreventDefault = true;
  }
}

function dispatchEvent (view, type, event, target) {
  const props = view[INTERNAL_EVENT_HANDLERS_KEY];
  const viewEvent = new ViewEvent(view, event, target);

  if (typeof props[type] === 'function') {
    props[type](event);
  } else {
    const alias = HTMLAliasEventMap[type];
    if (typeof props[alias] === 'function') {
      viewEvent.type = 'click';
      props[alias](viewEvent);
    } 
  }

  if (HTMLDefaultBehaviorsTags.includes(view.tagName)) {
    if (!viewEvent.isPreventDefault) {
      if (props.href) {
        wx.navigator({ url: props.href })
      }
    }
  }

  if (viewEvent.bubbles && !viewEvent.cancelBubble) {
    const parent = view.return;

    if (
      parent &&
      parent.tagName !== TAG_NAME
    ) {
      dispatchEvent(parent, type, event, viewEvent.currentTarget);
    }
  }
}

export function scheduleWork ({ type, event, view }) {
  return dispatchEvent(view, type, event);
}