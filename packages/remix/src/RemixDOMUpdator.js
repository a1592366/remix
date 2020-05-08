
import * as ViewNativeSupport from './RemixViewSupport';
import { INTERNAL_RELATIVE_KEY } from './RemixShared';
import { TAG_NAME } from './RemixViewController';

const TEXT_TAGNAME = '#text';

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
  let json = element.tagName === TEXT_TAGNAME ?
    {
      tagName: element.tagName,
      text: element.text
    } : {
      vid: element.vid,
      tagName: element.tagName,
      tag: element.tag,
      ...resolveDefaultProps(element.defaultProps, element)
    }

  if (element.sibling) {
    json.sibling = serialize(element.sibling);
  }

  if (element.child) {
    json.child = serialize(element.child);
  }

  if (element.innerText) {
    json.innerText = element.innerText;
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
    if (stateNode.tagName === TAG_NAME) {
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


