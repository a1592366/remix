import { isNullOrUndefined } from '../shared/is';
import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';

export default class HTMLViewElement extends HTMLElement {
  constructor () {
    super();

    this.nodeType = ELEMENT_NODE;
    this.tagName = 'view';
  }

  serialize () {
    const element = {
      ...super.serialize(),

    };

    if (!isNullOrUndefined(this.slibing)) {
      element.slibing = this.slibing.serialize();
    }

    return element;
  }
}