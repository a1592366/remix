import { isNullOrUndefined } from '../shared/is';
import Element from './Element';
import StyleSheet from './StyleSheet';

export default class HTMLElement extends Element {
  constructor (tagName) {
    super();

    this.tagName = tagName;
    this.style = new StyleSheet();
  }

  set innerHTML (innerHTML) {
    throw new Error('Sorry, innerHTML is not be supportted');
  }

  appendChild (child) {
    if (isNullOrUndefined(this.child)) {
      this.child = this.lastChild = child;
    } else {
      this.lastChild.slibing = child;
      this.lastChild = child;
    }    

    child.return = this;
  }

  removeChild (child) {

  }

  getAttribute (name) {
    return this[name];
  }
  setAttribute (name, value) {
    this[name] = value;
  }

  removeAttribute (name) {
    this[name] = null;
  }

  addEventListener () {}
  removeEventListener () {}
  dispatchEvent (type, id, e) {
    console.log()
  }

  toString () {
    return `[object HTML${this.tagName}Element]`;
  }

  serialize () {
    const element = {
      uuid: this.uuid,
      nodeType: this.nodeType,
      tagName: this.tagName,
      className: this.className || null,
      innerText: this.innerText || null,
      onTouchStart: this.onTouchStart || null,
      onTouchMove: this.onTouchMove || null,
      onTouchEnd: this.onTouchEnd || null,
      onTransitionEnd: this.onTransitionEnd || null,
      onAnimationStart: this.onAnimationStart || null,
      onAnimationEnd: this.onAnimationEnd || null
    };

    if (!isNullOrUndefined(this.child)) {
      element.child = this.child.serialize();
    }

    if (!isNullOrUndefined(this.slibing)) {
      element.slibing = this.slibing.serialize();
    }

    return element;
  }
}