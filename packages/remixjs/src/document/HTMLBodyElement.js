import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { BODY } from './HTMLTypes';
import document from './document';

export default class HTMLBodyElement extends HTMLElement {
  tagName = BODY;
  nodeType = ELEMENT_NODE;

  get ownerDocument () {
    return document;
  }
}