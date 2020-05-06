
import { document } from './RemixDocument';

const freeze = Object.freeze;

import {
  HOST_COMPONENT,
  HOST_TEXT,
  HOST_PORTAL
} from './RemixShared';

import { 
  INTERNAL_INSTANCE_KEY, 
  INTERNAL_EVENT_HANDLERS_KEY 
} from './RemixShared';

import {
  STYLE,
  CHILDREN,
  FLOAT
} from './RemixShared';

const hasOwnProperty = Object.hasOwnProperty;

function setValueForProperty (
  element, 
  propName, 
  value
) {
  if (value === null) {
    element.removeAttribute(propName, value);
  } else {
    element.setAttribute(propName, value);
  }
}

function setTextContent (
  element,
  content
) {
  element.innerText = content;
}

function setValueForStyles (
  element,
  styles
) {
  const style = element.style;

  for (let styleName in styles) {
    if (styleName === FLOAT) {
      styleName = 'cssFloat';
    }

    style[styleName] = styles[styleName];
  }
}


// ---- export ----
export function createTextInstance (text) {
  return document.createTextNode(text);
}

export function createInstance (
  type,
  props,
  workInProgress
) {
  const element = document.createElement(type);

  element[INTERNAL_INSTANCE_KEY] = workInProgress;
  element[INTERNAL_EVENT_HANDLERS_KEY] = props;

  return element;
}

export function insertBefore (
  instance,
  child,
  beforeChild
) {
  instance.insertBefore(child, beforeChild);
}

export function appendChild (instance, child) {
  instance.appendChild(child);
}

export function createElement (
  type, 
  props
) {
  let element;

  if (typeof props.is === 'string') {
    element = document.createElemeent(type, { is: props.is });
  } else {
    element = document.createElemeent(type);
  }

  return element;
}

export function appendChildToContainer (
  parentNode,
  child
) {
  parentNode.appendChild(child);
}

export function appendInitialChild (
  instance,
  child
) {
  instance.appendChild(child);
}

export function appendAllChildren (
  instance,
  workInProgress
) {
  let node = workInProgress.child;

  while (node !== null) {
    if (node.tag === HOST_COMPONENT || node.tag === HOST_TEXT) {
      appendInitialChild(instance, node.stateNode);
    } else if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === workInProgress) {
      return;
    }
    while (node.sibling === null) {
      if (node.return === null || node.return === workInProgress) {
        return;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}

export function updateDOMProperties (
  tag,
  element,
  pendingProps,
  memoizedProps,
) {
  const props = { ...memoizedProps, ...pendingProps };

  if (memoizedProps === null) {

  }

  for (let propName in props ) {
    let prop = memoizedProps[propName];
    let nextProp = pendingProps[propName];

    if (prop === nextProp) {

    } else if (propName === STYLE) {

      if (nextProp) { 
        freeze(nextProp);
        setValueForStyles(element, nextProp);
      }

    } else if (propName === CHILDREN) {
      const canSetTextContent = tag !== 'textarea' || nextProp !== '';
      const typeofProp = typeof nextProp;

      if (canSetTextContent && prop !== nextProp) {
        if (typeofProp === 'string' || typeofProp === 'number') {
          setTextContent(element, nextProp);
        }
      }
    } else if (nextProp !== null) {
      setValueForProperty(element, propName, nextProp);
    }
  }
}

export function setDOMProperties (
  tag, 
  element, 
  nextProps,
) {
  for (let propName in nextProps) {
    if (hasOwnProperty.call(nextProps, propName)) {
      const nextProp = nextProps[propName];

      if (propName === STYLE) {
        if (nextProp) {
          freeze(nextProp);
        }

        setValueForStyles(element, nextProp);
      } else if (propName === CHILDREN) {

        const canSetTextContent = tag !== 'textarea' || nextProp !== '';
        const typeofProp = typeof nextProp;

        if (canSetTextContent) {
          if (typeofProp === 'string' || typeofProp === 'number') {
            setTextContent(element, nextProp);
          }
        }
      } else if (nextProp !== null) {
        setValueForProperty(element, propName, nextProp);
      } 
    }
  }
}

export function insertInContainerBefore (
  parentNode, 
  child, 
  beforeChild,
) {
  parentNode.insertBefore(child, beforeChild);
}