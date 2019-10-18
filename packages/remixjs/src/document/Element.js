import uuid from 'uuid/v4';
import document from './document';

export default class Element {
  uuid = uuid();
  tagName = null;
  nodeType = null;
  child = null;
  return = null;
  lastChild = null;

  get ownerDocument () {
    return document;
  }
}