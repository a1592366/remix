import { isNullOrUndefined } from '../shared/is';
import HTMLElement from './HTMLElement';
import StyleSheet from './StyleSheet';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { VIDEO } from './HTMLTypes';

import RemixVideo from '../components/remix-element/remix-video';

export default class RemixVideoElement extends HTMLElement {
  static defaultProps = RemixVideo.defaultProps;

  constructor () {
    super();

    this.tagName = VIDEO;
    this.nodeType = ELEMENT_NODE;
    this.style = new StyleSheet();
  }

  appendChild (child) {}
  removeChild (child) {}
}