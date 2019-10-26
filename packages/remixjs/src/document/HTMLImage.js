import { isNullOrUndefined } from '../shared/is';
import HTMLElement from './HTMLElement';
import StyleSheet from './StyleSheet';

export default class HTMLImage extends HTMLElement {
  constructor () {
    super();

    this.tagName = 'image';
    this.style = new StyleSheet();
  }

  appendChild (child) {}
  removeEventListener () {}

  serialize () {
    const element = {
      ...super.serialize(),
      src: this.src,
      mode: this.mode
    };

    if (!isNullOrUndefined(this.slibing)) {
      element.slibing = this.slibing.serialize();
    }

    return element;
  }
}