import document from './document';

let id = 0;

export default class Element {
  constructor () {
    this.uuid = `rx-${id++}`;
    this.tagName = null;
    this.nodeType = null;
    this.child = null;
    this.return = null;
    this.sibling = null;
    this.previous = null;
    this.lastChild = null;
  }

  get ownerDocument () {
    return document;
  }
}