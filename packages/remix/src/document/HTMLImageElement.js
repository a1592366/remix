import { isNullOrUndefined } from '../shared/is';
import HTMLElement from './HTMLElement';
import StyleSheet from './StyleSheet';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { IMAGE } from './HTMLTypes';

import RemixImage from '../components/remix-element/remix-image';

export default class HTMLImageElement extends HTMLElement {
  static defaultProps = RemixImage.defaultProps;

  constructor () {
    super();

    this.tagName = IMAGE;
    this.nodeType = ELEMENT_NODE;
    this.style = new StyleSheet();
  }

  appendChild (child) {}
  removeChild (child) {}
}