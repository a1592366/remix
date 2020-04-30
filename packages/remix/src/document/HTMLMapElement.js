import { isNullOrUndefined } from '../shared/is';
import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';
import { MAP } from './HTMLTypes';

import RemixMap from '../components/remix-ui/remix-map';

export default class RemixMapElement extends HTMLElement {
  static defaultProps = RemixMap.defaultProps;

  constructor () {
    super();

    this.tagName = MAP;
    this.nodeType = ELEMENT_NODE;
  }

  appendChild (child) {}
  removeChild (child) {}
}