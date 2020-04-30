import { isNullOrUndefined } from '../shared/is';
import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { TEXTAREA } from './HTMLTypes';

import RemixTextArea from '../components/remix-ui/remix-textarea';

export default class RemixTextAreaElement extends HTMLElement {
  static defaultProps = RemixTextArea.defaultProps;

  constructor () {
    super();

    this.tagName = TEXTAREA;
    this.nodeType = ELEMENT_NODE;
  }

  appendChild (child) {}
  removeChild (child) {}
}