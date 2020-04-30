import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { TEXT } from './HTMLTypes';

import RemixText from '../components/remix-ui/remix-text';


export default class HTMLTextElement extends HTMLElement {
  static defaultProps = RemixText.defaultProps;

  constructor (textContent) {
    super();

    this.nodeType = ELEMENT_NODE;
    this.tagName = TEXT;
  }
}