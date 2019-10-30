import { isUndefined, isNullOrUndefined } from '../shared/is';
import Element from './Element';
import StyleSheet from './StyleSheet';

function resolveDefaultProps (
  defaultProps,
  unresolvedProps
) {
  if (defaultProps) {
    const props = {};
    
    for (let propName in defaultProps) {
      if (isUndefined(unresolvedProps[propName])) {
        props[propName] = defaultProps[propName];
      } else {
        props[propName] = unresolvedProps[propName];
      }
    }

    return props;
  }
  
  return {};
}

export default class HTMLElement extends Element {
  constructor (tagName) {
    super();

    this.tagName = tagName;
    this.style = new StyleSheet();
  }

  set innerHTML (innerHTML) {
    throw new Error('Sorry, innerHTML is not be supportted');
  }

  appendChild (child) {
    if (isNullOrUndefined(this.child)) {
      this.child = this.lastChild = child;
    } else {
      this.lastChild.slibing = child;
      this.lastChild = child;
    }    

    child.return = this;
  }

  removeChild (child) {

  }

  getAttribute (name) {
    return this[name];
  }
  setAttribute (name, value) {
    this[name] = value;
  }

  removeAttribute (name) {
    this[name] = null;
  }

  addEventListener () {}
  removeEventListener () {}
  dispatchEvent (type, id, e) {
    console.log()
  }

  toString () {
    return `[object HTML${this.tagName}Element]`;
  }

  serialize () {
    const defaultProps = this.constructor.defaultProps;
    const element = resolveDefaultProps(defaultProps, this);

    element.style = String(element.style);

    if (!isNullOrUndefined(this.child)) {
      element.child = this.child.serialize();
    }

    if (!isNullOrUndefined(this.slibing)) {
      element.slibing = this.slibing.serialize();
    }

    if (!isNullOrUndefined(this.innerText)) {
      element.innerText = this.innerText;
    }

    element.tagName = this.tagName;
    element.uuid = this.uuid;
    element.nodeType = this.nodeType;

    return element;
  }
}