import createTextNode from './createTextNode';
import { INTERNAL_INSTANCE_KEY, INTERNAL_EVENT_HANDLERS_KEY } from '../../shared';

export default function createTextInstance (
  text,
  rootContainerInstance,
  context,
  workInProgress
) {
  const element = createTextNode(text, rootContainerInstance);
  element[INTERNAL_INSTANCE_KEY] = workInProgress;
  return element;
}