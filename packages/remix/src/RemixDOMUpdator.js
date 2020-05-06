
import * as ViewNativeSupport from './RemixViewSupport';
import { INTERNAL_RELATIVE_KEY } from './RemixShared';

const HTMLBlockSupport = 'section ol ul li div p footer header h1 h2 h3 h4 h5 h6 nav section dt dd dl code hr'.split(' ');
const HTMLInlineSupport = 'strong em span i b br a img'.split(' ');

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

function serialize (element) {
  let json = {
    vid: element.vid,
    tagName: element.tagName,
    ...resolveDefaultProps(element.defaultProps, element)
  };

  if (element.sibling) {
    json.sibling = serialize(element.sibling);
  }

  if (element.child) {
    if (element.child.tagName === '#text') {
      json.child = {
        tagName: element.child.tagName,
        text: element.child.text
      }
    } else {
      json.child = serialize(element.child);
    }
  }

  if (element.innerText) {
    json.innerText = element.innerText;
  }

  if (HTMLBlockSupport.includes(element.tagName)) {
    json.tagName = 'view';
    json.tag = element.tagName;
  } 

  if (HTMLInlineSupport.includes(element.tagName)) {
    json.tagName = 'text';
    json.tag = element.tagName;
  }

  if (element.tagName === 'img') {
    json.tagName = 'image';
    json.src = element.src;
  }

  return json;
}

const flattern = function (element) {
  const { child } = element;

  if (child) {
    const siblings = [];
    let sibling = child.sibling;

    if (child.child) {
      flattern(child);
    }

    while (sibling) {
      if (sibling.child) {
        flattern(sibling);
      }

      const { sibling: s, ...rest } = sibling;

      siblings.push(rest);
      sibling = sibling.sibling;
    } 

    if (siblings.length > 0) {
      child.siblings = siblings;
    }

    delete child.sibling;
  }
}


export function DOMUpdateQueue (finishedWork) {
  const { stateNode } = finishedWork;

  if (stateNode) {
    if (stateNode.tagName === 'view-controller') {
      const element = serialize(stateNode);

      flattern(element);

      console.log(element.child)

      ViewNativeSupport.Publisher.Data(
        stateNode[INTERNAL_RELATIVE_KEY], 
        element.child
      );
    }
  }
}


