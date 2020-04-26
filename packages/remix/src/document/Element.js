import uuid from 'uuid/v4';
import globalElements from './globalElements';
import document from './document';


import Updater from './Updater';

export default class Element extends Updater {
  constructor () {
    super();

    this.uuid = uuid();
    this.tagName = null;
    this.nodeType = null;
    this.child = null;
    this.return = null;
    this.lastChild = null;

    globalElements[this.uuid] = this;
  }

  get ownerDocument () {
    return document;
  }
}