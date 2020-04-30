import Element from './Element';

function resolveDefaultProps (
  defaultProps,
  unresolvedProps
) {
  if (defaultProps) {
    const props = {};
    
    for (let propName in defaultProps) {
      let value;
      if (unresolvedProps[propName] === undefined) {
        value = defaultProps[propName];
      } else {
        value = unresolvedProps[propName];
      }

      if (!(value === null || value === undefined)) {
        props[propName] = value;
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
    this.innerText = null;
    this.style = {};
  }

  set innerHTML (html) {
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
    child.previous = this.lastChild;
    child.return = this;
    child.parentNode = this;
    
    if (this.child === null) {
      this.child = this.lastChild = child;
    } else {
      this.lastChild.sibling = child;
      this.lastChild = child;
    }    
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
  }

  insertBefore (child, beforeChild) {
    if (this.child === beforeChild) {
      this.child = child;
    } else {
      beforeChild.previous.sibling = child;
    }

    child.sibling = beforeChild;
    beforeChild.previous = child;
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

  toString () {
    return `[object HTML${this.tagName}Element]`;
  }

  serialize () {
    const defaultProps = this.constructor.defaultProps;
    const element = resolveDefaultProps(defaultProps, this);

    if (this.sibling) {
      element.sibling = this.sibling.serialize();
    } else {
      element.sibling = this.sibling;
    }

    if (this.child) {
      element.child = this.child.serialize();
    } 

    if (this.innerText) {
      element.innerText = this.innerText;
    }

    element.tagName = this.tagName;
    element.uuid = this.uuid;

    return element;
  }
}
