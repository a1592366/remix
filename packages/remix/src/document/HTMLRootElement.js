import { isNullOrUndefined } from '../shared/is';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { ROOT } from './HTMLTypes';
import HTMLElement from './HTMLElement';

import RemixRoot from '../components/remix-element/remix-root';

export default class HTMLViewElement extends HTMLElement {
  static defaultProps = RemixRoot.defaultProps;

  constructor () {
    super();

    this.nodeType = ELEMENT_NODE;
    this.tagName = ROOT;
  }
}