import { isNullOrUndefined } from '../shared/is';
import { SWIPER } from './HTMLTypes';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import HTMLElement from './HTMLElement';
import HTMLTextElement from './HTMLTextElement';
import StyleSheet from './StyleSheet';

export default class HTMLSwiperElement extends HTMLElement {
  constructor () {
    super();

    this.tagName = SWIPER;
    this.nodeType = ELEMENT_NODE;
  }

  serialize () {
    const element = {
      ...super.serialize(),
      interval: this.interval,
      indicatorDots: this.indicatorDots,
      duration: this.duration
    };

    return element;
  }
}