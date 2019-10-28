import { isNullOrUndefined } from '../shared/is';
import { SWIPER_ITEM } from './HTMLTypes';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import HTMLElement from './HTMLElement';
import HTMLTextElement from './HTMLTextElement';
import StyleSheet from './StyleSheet';

import RemixSwiperItem from '../components/remix-element/remix-swiper-item';

export default class HTMLSwiperItemElement extends HTMLElement {
  static defaultProps = RemixSwiperItem.defaultProps;
  
  constructor () {
    super();

    this.tagName = SWIPER_ITEM;
    this.nodeType = ELEMENT_NODE;
  }
}