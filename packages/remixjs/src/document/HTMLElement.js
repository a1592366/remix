import { isNullOrUndefined } from '../shared/is';
import Element from './Element';
import StyleSheet from './StyleSheet';

export default class HTMLElement extends Element {
  constructor (tagName) {
    super();

    this.tagName = tagName;
    this.style = new StyleSheet();
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
  removeChild () {}

  getAttribute () {}
  setAttribute () {}
  removeAttribute () {}

  addEventListener () {}
  removeEventListener () {}

  toString () {
    return `[object HTML${this.tagName}Element]`;
  }

  serialize () {
    const element = {
      uuid: this.uuid,
      nodeType: this.nodeType,
      tagName: this.tagName,
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