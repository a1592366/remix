import HTMLElement from './HTMLElement';
import HTMLImageElement from './HTMLImageElement';
import HTMLButtonElement from './HTMLButtonElement';
import HTMLViewElement from './HTMLViewElement';
import HTMLTextElement from './HTMLTextElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { IMAGE, INPUT, MAP, BUTTON, VIEW, TEXT } from './HTMLTypes';

export default function createElement (tagName) {
  let element;

  switch (tagName) {
    case IMAGE: {
      return new HTMLImageElement();
    }

    case BUTTON: {
      return new HTMLButtonElement();
    }

    case VIEW: {
      return new HTMLViewElement();
    }

    case TEXT: {
      return new HTMLTextElement();
    }
  
    default: {
      return new HTMLElement(tagName);
    }
  }
}