import { isNullOrUndefined } from '../shared/is';
import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { INPUT } from './HTMLTypes';

import RemixInput from '../components/remix-ui/remix-input';

export default class RemixInputElement extends HTMLElement {
  static defaultProps = RemixInput.defaultProps;

  constructor () {
    super();

    this.tagName = INPUT;
    this.nodeType = ELEMENT_NODE;
  }

  appendChild (child) {}
  removeChild (child) {}
}