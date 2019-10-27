import { isNullOrUndefined } from '../shared/is';
import { SWIPER_ITEM } from './HTMLTypes';
import HTMLElement from './HTMLElement';
import HTMLTextElement from './HTMLTextElement';
import StyleSheet from './StyleSheet';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';

export default class HTMLSwiperItemElement extends HTMLElement {
  constructor () {
    super();

    this.tagName = SWIPER_ITEM;
    this.nodeType = ELEMENT_NODE;
  }

  serialize () {
    const element = {
      ...super.serialize()
    };

    return element;
  }
}