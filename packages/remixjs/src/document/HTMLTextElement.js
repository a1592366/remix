import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { TEXT } from './HTMLTypes';

export default class HTMLTextElement extends HTMLElement {
  constructor (textContent) {
    super();

    this.textContent = textContent;
    this.nodeType = ELEMENT_NODE;
    this.tagName = TEXT;
  }

  serialize () {
    const element = {
      ...super.serialize()
    };

    return element;
  }
}