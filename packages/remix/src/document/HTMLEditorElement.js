import { isNullOrUndefined } from '../shared/is';
import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { EDITOR } from './HTMLTypes';

import RemixEditor from '../components/remix-ui/remix-editor';

export default class RemixTextAreaElement extends HTMLElement {
  static defaultProps = RemixEditor.defaultProps;

  constructor () {
    super();

    this.tagName = EDITOR;
    this.nodeType = ELEMENT_NODE;
  }

  appendChild (child) {}
  removeChild (child) {}
}