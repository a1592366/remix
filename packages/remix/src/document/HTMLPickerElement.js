import { isNullOrUndefined } from '../shared/is';
import { PICKER } from './HTMLTypes';
import HTMLElement from './HTMLElement';
import HTMLTextElement from './HTMLTextElement';
import StyleSheet from './StyleSheet';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';

import RemixPicker from '../components/remix-element/remix-picker';

export default class HTMLPickerElement extends HTMLElement {
  static defaultProps = RemixPicker.defaultProps;

  constructor () {
    super();

    this.tagName = PICKER;
    this.nodeType = ELEMENT_NODE;
  }
}