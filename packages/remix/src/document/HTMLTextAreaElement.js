import { isNullOrUndefined } from '../shared/is';
import HTMLElement from './HTMLElement';
import StyleSheet from './StyleSheet';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { TEXTAREA } from './HTMLTypes';

import RemixTextArea from '../components/remix-element/remix-textarea';

export default class RemixTextAreaElement extends HTMLElement {
  static defaultProps = RemixTextArea.defaultProps;

  constructor () {
    super();

    this.tagName = TEXTAREA;
    this.nodeType = ELEMENT_NODE;
    this.style = new StyleSheet();
  }

  appendChild (child) {}
  removeChild (child) {}
}