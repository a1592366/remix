import { RemixElement } from './RemixElement';
import { flatten } from './RemixShared';

const isArray = Array.isArray;
const shim = () => shim;

shim.isRequired = shim;

export const Children = {
  forEach (
    children, 
    iterator, 
    context
  ) {
    if (children !== null || children !== undefined) {
      children = Children.toArray(children);
      const length = children.length;
  
      if (length > 0) {
        if (context && context !== children) {
          iterator = iterator.bind(context);
        }
    
        for (let i = 0; i < length; i++) {
          const child = children[i];
    
          iterator(child, i, children);
        }
      }
    }
  },

  map (
    children, 
    iterator, 
    context
  ) {
    children = Children.toArray(children);
    if (context && context !== children) {
      iterator = iterator.bind(context);
    }
  
    return children.map(iterator);
  },

  toArray (
    children
  ) {
    if (children === null || children === undefined) {
      return [];
    }
  
    if (isArray(children)) {
      return flatten(children);
    }
  
    return [].concat(children);
  },

  count (children) {
    return Children.toArray(children).length;
  },

  only (children) {
    children = Children.toArray(children);

    return children[0];
  }
}

export const PropTypes = {
  array: shim,
  bool: shim,
  func: shim,
  number: shim,
  object: shim,
  string: shim,
  any: shim,
  arrayOf: shim,
  element: shim,
  instanceOf: shim,
  node: shim,
  objectOf: shim,
  oneOf: shim,
  oneOfType: shim,
  shape: shim,
  exact: shim,
  PropTypes: {},
  checkPropTypes: shim
}

export function createElement (
  type, 
  config, 
  ...children
) {
  const { length } = children;
  const { key, ref, ...props } = config || {};

  if (length > 0) {
    if (length === 1) {
      props.children = children[0];

      if (isArray(props.children)) {
        if (props.children.length === 1) {
          props.children = props.children[0];
        }
      }
    } else {
      props.children = children;
    }
  } 

  return RemixElement(
    type,
    props,
    key
  )
}

export * from './RemixHook';

export class Component {
  isReactComponent = true
}

export class PureComponent extends Component {
  isPureComponent = true
}

export default {
  Component,
  PureComponent,

  createElement
}
