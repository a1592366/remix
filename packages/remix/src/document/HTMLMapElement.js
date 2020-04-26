import { isNullOrUndefined } from '../shared/is';
import HTMLElement from './HTMLElement';
import StyleSheet from './StyleSheet';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { MAP } from './HTMLTypes';

import RemixMap from '../components/remix-element/remix-map';

export default class RemixMapElement extends HTMLElement {
  static defaultProps = RemixMap.defaultProps;

  constructor () {
    super();

    this.tagName = MAP;
    this.nodeType = ELEMENT_NODE;
    this.style = new StyleSheet();
  }

  appendChild (child) {}
  removeChild (child) {}
}