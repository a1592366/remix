import { REACT_ELEMENT_TYPE } from './RemixShared';

export function RemixElement (
  type, 
  props = {}, 
  key = null,
  ref = null,
  owner = null
) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    _owner: owner
  }; 

  return element;
}