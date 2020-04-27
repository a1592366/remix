import Element from './Element';
import StyleSheet from './StyleSheet';
import { enqueueUpdate } from '../ReactDOMUpdator';
import { INTERNAL_RELATIVE_KEY } from '../shared';

function resolveDefaultProps (
  defaultProps,
  unresolvedProps
) {
  if (defaultProps) {
    const props = {};
    
    for (let propName in defaultProps) {
      if (unresolvedProps[propName] === undefined) {
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
    this.style = new StyleSheet(this);
  }

  set innerHTML (innerHTML) {
    throw new Error('Sorry, innerHTML is not be supportted');
  }

  getElementById (id) {
    if (this.uuid === id) {
      return this;
    }

    let node = this.child;

    while (node) {
      if (node.uuid === id) {
        return node;
      }

      if (node.child) {
        node = node.child;
      } else {
        while (node.sibling === null) {
          if (node.return === null) { 
            return null; 
          }
      
          node = node.return;
        }
      
        node = node.sibling;
      }
    }
  }

  appendChild (child) {
    if (this.child === null) {
      this.child = this.lastChild = child;
    } else {
      this.lastChild.sibling = child;
      this.lastChild = child;
    }    

    child.parent = this.uuid;
    child.return = this;
    child.parentNode = this;

    enqueueUpdate(this);
  }

  removeChild (child) {
    let node = this.child;
    let prevNode = null;

    while (node) {
      if (child === node) {
         if (node === this.child) {
          this.child = node.sibling;
         } else {
          prevNode.sibling = node.sibling;
         }
      }

      prevNode = node;
      node = node.sibling;
    }

    enqueueUpdate(this);
  }

  insertBefore (child, beforeChild) {
    child.return = this;
    child.sibling = beforeChild;

    child.parent = this.uuid;

    if (beforeChild === this.child) {
      this.child = child;
    }
  }

  getAttribute (name) {
    return this[name];
  }

  setAttribute (name, value) {
    this[name] = value;

    enqueueUpdate(this);
  }

  removeAttribute (name) {
    this[name] = null;

    enqueueUpdate(this);
  }

  addEventListener () {}
  removeEventListener () {}

  toString () {
    return `[object HTML${this.tagName}Element]`;
  }

  serialize () {
    const defaultProps = this.constructor.defaultProps;
    const element = resolveDefaultProps(defaultProps, this);

    element.style = String(element.style);

    if (this.child) {
      element.child = this.child.serialize();
    }

    if (this.sibling) {
      element.sibling = this.sibling.serialize();
    }

    if (this.innerText) {
      element.innerText = this.innerText;
    }

    element.tagName = this.tagName;
    element.uuid = this.uuid;
    element.nodeType = this.nodeType;
    element.parent = this.parent;
    element[INTERNAL_RELATIVE_KEY] = this[INTERNAL_RELATIVE_KEY];

    return element;
  }
}