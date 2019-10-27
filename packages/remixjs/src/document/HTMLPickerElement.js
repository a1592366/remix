import { isNullOrUndefined } from '../shared/is';
import { PICKER } from './HTMLTypes';
import HTMLElement from './HTMLElement';
import HTMLTextElement from './HTMLTextElement';
import StyleSheet from './StyleSheet';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';

export default class HTMLPickerElement extends HTMLElement {
  constructor () {
    super();

    this.tagName = PICKER;
    this.nodeType = ELEMENT_NODE;
  }

  serialize () {
    const element = {
      ...super.serialize(),
      mode: this.mode
    };

    return element;
  }
}