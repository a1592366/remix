import { isNullOrUndefined } from '../shared/is';
import { BUTTON } from './HTMLTypes';
import HTMLElement from './HTMLElement';
import HTMLTextElement from './HTMLTextElement';
import StyleSheet from './StyleSheet';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';

export default class HTMLButtonElement extends HTMLElement {
  constructor () {
    super();

    this.tagName = BUTTON;
    this.nodeType = ELEMENT_NODE;
  }

  serialize () {
    const element = {
      ...super.serialize(),
      plain: this.plain,
      openType: this.openType
    };

    return element;
  }
}