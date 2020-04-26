import { isNullOrUndefined } from '../shared/is';
import { BUTTON } from './HTMLTypes'; 
import HTMLElement from './HTMLElement';
import HTMLTextElement from './HTMLTextElement';
import StyleSheet from './StyleSheet';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';

import RemixButton from '../components/remix-element/remix-button';

export default class HTMLButtonElement extends HTMLElement {
  static defaultProps = RemixButton.defaultProps;

  constructor () {
    super();

    this.tagName = BUTTON;
    this.nodeType = ELEMENT_NODE;
  }
}