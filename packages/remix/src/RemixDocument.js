import RemixUI from './RemixUI';
// ---- HTML ELEMENT ----
let vid = 0;

const HTMLBlockSupport = 'section ol ul li div p footer header h1 h2 h3 h4 h5 h6 nav section dt dd dl code hr'.split(' ');
const HTMLInlineSupport = 'strong em span i b br a img'.split(' ');
const HTMLAliasSupport = 'img'.split(' ');

const HTMLAttributeAliasMap = {
  onClick: 'onTap'
};

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

    if (HTMLAttributeAliasMap[name]) {
      this[HTMLAttributeAliasMap[name]] = HTMLAttributeAliasMap[name];
    }
  }

  removeAttribute (name) {
    this[name] = null;
  }

  ownerDocument () {
    return document;
  }

  getElementById (id) {
    if (this.vid === id) {
      return this;
    }

    let node = this.child;

    while (node) {
      if (node.vid === id) {
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
}

export const document = typeof document === 'undefined' ? {
  createElement (tagName) {
    const element = new HTMLElement();
    element.tagName = tagName;
    element.tag = tagName;

    if (HTMLAliasSupport.includes(tagName)) {
      element.tagName = 'image';
      element.defaultProps = RemixUI['image'];
    } else if (HTMLInlineSupport.includes(tagName)) {
      element.tagName = 'text';
      element.defaultProps = RemixUI['text'];
    } else if (HTMLBlockSupport.includes(tagName)) {
      element.tagName = 'view';
      element.defaultProps = RemixUI['view'];
    } else {
      element.defaultProps = RemixUI[tagName];
    }

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