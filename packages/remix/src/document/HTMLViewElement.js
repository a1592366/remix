import { isNullOrUndefined } from '../shared/is';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { VIEW } from './HTMLTypes';
import HTMLElement from './HTMLElement';

import RemixView from '../components/remix-element/remix-view';

export default class HTMLViewElement extends HTMLElement {
  static defaultProps = RemixView.defaultProps;

  constructor () {
    super();

    this.nodeType = ELEMENT_NODE;
    this.tagName = VIEW;
  }
}