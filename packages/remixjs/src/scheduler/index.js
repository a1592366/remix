import { request } from 'requestidlecallback';
import { HOST_ROOT, HOST_COMPONENT, FUNCTION_COMPONENT, CLASS_COMPONENT } from '../shared/workTags';
import { EXPIRE_TIME, EMPTY_REFS, EMPTY_CONTEXT } from '../shared';
import { PERFORMED, PLACEMENT, UPDATE, PERFORMED_WORK, REF, SNAPSHOT, INCOMPLETE, NO_EFFECT } from '../shared/effectTags';
import { resolveDefaultProps, shallowEqual } from '../shared';
import { createWorkInProgress } from '../reconciler/Fiber';
import { reconcileChildren, cloneChildFibers } from '../reconciler';
import { requestWork } from './performWork';
import { 
  createUpdate, 
  enqueueUpdate, 
  processUpdateQueue, 
  resetHasForceUpdateBeforeProcessing, 
  checkHasForceUpdateAfterProcessing
} from './updateQueue';


let nextUnitOfWork = null;
let workInProgress = null;

export function scheduleRootUpdate (current, element, callback) {
  const update = createUpdate();

  update.payload = { element };

  if (typeof callback === 'function') {
    update.callback = callback;
  }

  enqueueUpdate(current, update);
  scheduleWork(current);
}

export function scheduleWork (current, element, callback) {
  const root = scheduleToRoot(current);

  // reset global 
  requestWork(root);
}

function scheduleToRoot (fiber) {
  let node = fiber;

  while (node) {
    if (node.tag === HOST_ROOT) {
      break;
    }

    node = node.return;
  }

  return node;
}

