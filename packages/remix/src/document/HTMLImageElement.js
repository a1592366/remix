import { isNullOrUndefined } from '../shared/is';
import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { IMAGE } from './HTMLTypes';

import RemixImage from '../components/remix-ui/remix-image';

export default class HTMLImageElement extends HTMLElement {
  static defaultProps = RemixImage.defaultProps;

  constructor () {
    super();

    this.tagName = IMAGE;
    this.nodeType = ELEMENT_NODE;
  }

  appendChild (child) {}
  removeChild (child) {}
}