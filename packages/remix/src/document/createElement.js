import { IMAGE, INPUT, MAP, BUTTON, VIEW, TEXT, PICKER, SWIPER_ITEM, SWIPER, EDITOR, VIDEO, TEXTAREA } from './HTMLTypes';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import HTMLElement from './HTMLElement';
import HTMLImageElement from './HTMLImageElement';
import HTMLButtonElement from './HTMLButtonElement';
import HTMLViewElement from './HTMLViewElement';
import HTMLTextElement from './HTMLTextElement';
import HTMLPickerElement from './HTMLPickerElement';
import HTMLSwiperItemElement from './HTMLSwiperItemElement';
import HTMLSwiperElement from './HTMLSwiperElement';
import HTMLVideoElement from './HTMLVideoElement';
import HTMLInputElement from './HTMLInputElement';
import HTMLTextAreaElement from './HTMLTextAreaElement';
import HTMLEditorElement from './HTMLEditorElement';

export default function createElement (tagName) {
  switch (tagName) {
    case EDITOR: {
      return new HTMLEditorElement();
    }
    case TEXTAREA: {
      return new HTMLTextAreaElement();
    }

    case INPUT: {
      return new HTMLInputElement();
    }

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

    case PICKER: {
      return new HTMLPickerElement();
    }

    case SWIPER_ITEM: {
      return new HTMLSwiperItemElement();
    }

    case SWIPER: {
      return new HTMLSwiperElement();
    }

    case VIDEO: {
      return new HTMLVideoElement();
    }
  
    default: {
      return new HTMLElement(tagName);
    }
  }
}