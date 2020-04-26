import { isNullOrUndefined } from '../shared/is';
import { TEXT_NODE } from '../shared/HTMLNodeType';
import { PLAIN_TEXT } from './HTMLTypes';

export default function createTextNode (text) {
  return {
    nodeType: TEXT_NODE,
    tagName: PLAIN_TEXT,
    text,
    serialize () {
      const element =  {
        tagName: this.tagName,
        text: this.text,
      };

      if (!isNullOrUndefined(this.slibing)) {
        element.slibing = this.slibing.serialize();
      }

      return element;
    }
  }
}