import { isNullOrUndefined } from '../shared/is';
import { SWIPER } from './HTMLTypes';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import HTMLElement from './HTMLElement';

import RemixSwiper from '../components/remix-ui/remix-swiper';

export default class HTMLSwiperElement extends HTMLElement {
  static defaultProps = RemixSwiper.defaultProps;

  constructor () {
    super();

    this.tagName = SWIPER;
    this.nodeType = ELEMENT_NODE;
  }
}