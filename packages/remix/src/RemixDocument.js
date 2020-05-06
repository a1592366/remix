import RemixUI from './RemixUI';
// ---- HTML ELEMENT ----
let vid = 0;

class HTMLElement {
  vid = `rx.${vid++}`;

  return = null;
  sibling = null;
  child = null;

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

  ownerDocument () {
    return document;
  }
}

export const document = typeof document === 'undefined' ? {
  createElement (tagName) {
    const element = new HTMLElement();
    element.tagName = tagName;
    element.defaultProps = RemixUI[tagName];

    return element;
  },
  createTextNode (text) {
    return {
      tagName: '#text',
      text
    }
  },
  body: new HTMLElement('body')
} : document;

export const window = typeof window === 'undefined' ? {
  document
} : window;