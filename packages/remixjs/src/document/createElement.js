import HTMLElement from './HTMLElement';
import HTMLImage from './HTMLImage';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { IMAGE, INPUT, MAP, BUTTON } from './HTMLTypes';

export default function createElement (tagName, properties) {
  let element;

  switch (tagName) {
    case IMAGE: {
      element = new HTMLImage();
      break;
    }
  
    default: {
      element = new HTMLElement(tagName);
      break;
    }
  }

  
  element.nodeType = ELEMENT_NODE;
  return element;
}