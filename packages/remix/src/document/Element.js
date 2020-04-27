import uuid from 'uuid/v4';
import globalElements from './globalElements';
import document from './document';

export default class Element {
  constructor () {
    this.uuid = uuid();
    this.tagName = null;
    this.nodeType = null;
    this.child = null;
    this.return = null;
    this.sibling = null;
    this.lastChild = null;

    globalElements[this.uuid] = this;
  }

  get ownerDocument () {
    return document;
  }
}