import { isNullOrUndefined } from '../shared/is';
import HTMLElement from './HTMLElement';
import StyleSheet from './StyleSheet';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { IMAGE } from './HTMLTypes';

export default class HTMLImage extends HTMLElement {
  constructor () {
    super();

    this.tagName = IMAGE;
    this.nodeType = ELEMENT_NODE;
    this.style = new StyleSheet();
  }

  appendChild (child) {}
  removeChild (child) {}

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