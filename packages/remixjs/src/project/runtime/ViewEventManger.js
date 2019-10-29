import ViewController from './ViewController';
import { render } from '../../renderer';
import { document } from '../../document';
import createElement from '../../react/createElement';
import { ROOT } from '../../document/HTMLTypes';
import transports, { VIEW } from './transports';
import { isFunction } from '../../shared/is';
import { INTERNAL_INSTANCE_KEY } from '../../shared';

const bubbleEvent = [
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
  'animationend',
];

class EventObject {
  constructor (event) {
    this.__original_event__ = event;

    const { type, touches, timeStamp, changedTouches } = event;

    this.type = type;
    this.touches = touches;
    this.timeStamp = timeStamp;
    this.changedTouches = changedTouches;
    this.bubbles = bubbleEvent.includes(this.type);
    this.cancelBubble = false;
  }

  stopPropagation () {
    this.cancelBubble = true;
  }

  preventDefault () {}
}


export default class ViewEventManager {
  constructor (context) {
    this.context = context;
    this.events = {};
    
    transports.view.onDispatch(this.onDispatch);
  }

  callElementMethod (element, type, event) {
    const fiber = element[INTERNAL_INSTANCE_KEY]

    if (fiber.return) {
      const { stateNode } = fiber.return;

      if (stateNode.isReactComponent) {
        if (isFunction(stateNode[type])) {
          stateNode[type](event);
        }
      }
    }
  }

  onDispatch = (type, uuid, e) => {
    const { timeStamp, target } = e;
    // const id = e.target.id || e.target.dataset.remixId;
    const element = document.findElement(uuid);

    if (this.events[timeStamp]) {      
      if (element.tagName === ROOT) {
        delete this.events[timeStamp];
      }
    } else {
      const event = this.events[timeStamp] = new EventObject(e);
      const id = e.currentTarget.id || e.currentTarget.dataset.remixId;

      event.target = element;
      event.currentTarget = document.findElement(id);

      let node = element;

      if (event.bubbles) {
        while (node && node.tagName !== ROOT) {
          event.target = node;
          this.callElementMethod(node, type, event);

          if (event.cancelBubble) {
            break;
          }

          node = node.return;
        }
      } else {
        this.callElementMethod(node, type, event);
      }
      
    }
  }
}