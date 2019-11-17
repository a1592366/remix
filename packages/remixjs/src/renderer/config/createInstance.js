import createElement from './createElement';
import { isString } from '../../shared/is';
import { INTERNAL_INSTANCE_KEY, INTERNAL_EVENT_HANDLERS_KEY } from '../../shared';

export default function createInstance (
  type,
  props,
  rootContainerInstance,
  workInProgress
) {
  const { children } = props;
  const document = rootContainerInstance.ownerDocument;
  const element = document.createElement(type);

  element[INTERNAL_INSTANCE_KEY] = workInProgress;
  element[INTERNAL_EVENT_HANDLERS_KEY] = props;

  return element;
}