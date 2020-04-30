import { isNullOrUndefined } from '../shared/is';
import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { VIDEO } from './HTMLTypes';

import RemixVideo from '../components/remix-ui/remix-video';

export default class RemixVideoElement extends HTMLElement {
  static defaultProps = RemixVideo.defaultProps;

  constructor () {
    super();

    this.tagName = VIDEO;
    this.nodeType = ELEMENT_NODE;
  }

  appendChild (child) {}
  removeChild (child) {}
}