import { isNullOrUndefined } from '../shared/is';
import { SWIPER } from './HTMLTypes';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import HTMLElement from './HTMLElement';
import HTMLTextElement from './HTMLTextElement';
import StyleSheet from './StyleSheet';

import RemixSwiper from '../components/remix-element/remix-swiper';

export default class HTMLSwiperElement extends HTMLElement {
  static defaultProps = RemixSwiper.defaultProps;

  constructor () {
    super();

    this.tagName = SWIPER;
    this.nodeType = ELEMENT_NODE;
  }
}