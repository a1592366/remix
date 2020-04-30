import { PICKER } from './HTMLTypes';
import HTMLElement from './HTMLElement';
import { ELEMENT_NODE } from '../shared/HTMLNodeType';

import RemixPicker from '../components/remix-ui/remix-picker';

export default class HTMLPickerElement extends HTMLElement {
  static defaultProps = RemixPicker.defaultProps;

  constructor () {
    super();

    this.tagName = PICKER;
    this.nodeType = ELEMENT_NODE;
  }
}