import ReactElement from './ReactElement';
import { isFunction, isUndefined, isArray } from '../shared/is';
import { resolveDefaultProps } from '../shared';

export default function createElement (
  type, 
  props = {}, 
  ...children
) {
  const { length } = children;

  if (isFunction(type)) {
    props = resolveDefaultProps(type, props);
  } 

  if (length > 0) {
    if (length === 1) {
      props = props || {};
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

  return ReactElement(
    type, 
    { ...props }
  );
}