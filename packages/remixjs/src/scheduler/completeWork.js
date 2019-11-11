import { request } from 'requestidlecallback';
import { HOST_ROOT, HOST_COMPONENT, FUNCTION_COMPONENT, CLASS_COMPONENT } from '../shared/workTags';
import { EXPIRE_TIME, EMPTY_REFS, EMPTY_CONTEXT } from '../shared';
import { PERFORMED, PLACEMENT, UPDATE, PERFORMED_WORK, REF, SNAPSHOT, INCOMPLETE, NO_EFFECT } from '../shared/effectTags';
import { resolveDefaultProps, shallowEqual } from '../shared';
import { createWorkInProgress } from '../reconciler/Fiber';
import { reconcileChildren, cloneChildFibers } from '../reconciler';
import { createInstance, diffProperties } from '../renderer/config';
import { commitRoot } from './commitWork';
import { 
  createUpdate, 
  enqueueUpdate, 
  processUpdateQueue, 
  resetHasForceUpdateBeforeProcessing, 
  checkHasForceUpdateAfterProcessing
} from './updateQueue';

export function completeUnitOfWork (unitOfWork) {
  const workInProgress = unitOfWork;

  // 收集 effect
  while (true) {
    const current = workInProgress.alternate;
    const returnFiber = workInProgress.return;

    const sibling = workInProgress.sibling;
    
    if ((workInProgress.effectTag & INCOMPLETE) === NO_EFFECT) {
      let next = completeWork(current, workInProgress);
      if (next !== null) {
        return next;
      }

      if (returnFiber !== null &&
        (returnFiber.effectTag & INCOMPLETE) === NO_EFFECT
      ) {
        // 设置 firstEffect
        if (returnFiber.firstEffect === null) {
          returnFiber.firstEffect = workInProgress.firstEffect;
        }

        // 
        if (workInProgress.lastEffect !== null) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
          }
          returnFiber.lastEffect = workInProgress.lastEffect;
        }

        let effectTag = workInProgress.effectTag;
        if (effectTag > PERFORMED_WORK) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress;
          } else {
            returnFiber.firstEffect = workInProgress;
          }
          returnFiber.lastEffect = workInProgress;
        }
      }

      if (sibling !== null) {
        return sibling;
      } else if (returnFiber !== null) {
        // If there's no more work in this returnFNode. Complete the returnFNode.
        work = returnFiber;
        continue;
      } else {
        // We've reached the root.
        return null;
      }
    } else {
      if (sibling !== null) {
        // If there is more work to do in this returnFNode, do that next.
        return sibling;
      } else if (returnFiber !== null) {
        // If there's no more work in this returnFNode. Complete the returnFNode.
        WIP = returnFiber;
        continue;
      } else {
        return null;
      }
    }

  }

  return null
}


function completeWork (current, workInProgress) {
  const newProps = workInProgress.penddingProps;

  switch (workInProgress.tag) {
    case HOST_ROOT: {
      popHostContainer(WIP);
      // const fiberRoot = WIP.instanceNode;
      if (current === null || current.child === null) {
        WIP.effectTag &= ~Placement;
      }
      // updateHostContainer(WIP);
      return null;
    }
    case HOST_COMPONENT: {
      const rootContainerInstance = getRootHostContainer();
      const type = workInProgress.type;

      if (current !== null && workInProgress.stateNode !== null) {
        updateHostComponent(
          current,
          WIP,
          type,
          newProps,
          rootContainerInstance,
        );
      } else {
        if (!newProps) {
          break;
        }

        // const currentHostContext = getHostContext();
        const currentHostContext = {
          namespace: "http://www.w3.org/1999/xhtml"
        }
        let instance = createInstance(
          type,
          newProps,
          rootContainerInstance,
          currentHostContext,
          workInProgress,
        );

        appendAllChildren(instance, workInProgress);
        finalizeInitialChildren(instance, type, newProps, rootContainerInstance, currentHostContext);
        
        workInProgress.stateNode = instance;

      }
      return null;
    }
    case Text: {
      const newText = newProps;
      // that means it rendered
      if (current !== null && WIP.instanceNode !== null) {
        let oldText = current.prevProps;
        updateHostText(current, WIP, oldText, newText);
      } else {
        if (typeof newText !== 'string') {
          return null;
        }
        const rootContainerInstance = getRootHostContainer();
        WIP.instanceNode = createTextInstance(newText, rootContainerInstance, WIP);
      }
      return null;
    }
    case Fragment: {
      return null;
    }
    default:
      return null;
  }
}

function updateHostComponent (
  current, 
  workInProgress, 
  type, 
  newProps, 
  rootContainerInstance
) {
  const oldProps = current.memoizedProps;
  // 如果 props 无变化
  if (oldProps === newProps) {
    return;
  }
  
  const instance = workInProgress.stateNode;
  // diff properties
  const updatePayload = prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
  );
  
  workInProgress.updateQueue = updatePayload;
  if (updatePayload) {
    workInProgress.effectTag |= UPDATE;
  }
}

export function completeRoot (
  root,
  finishedWork
) {
  commitRoot(root, finishedWork)
}

function prepareUpdate (
  instance, 
  type,
  oldProps,
  newProps,
  rootContainerInstance
) {
  return diffProperties(
    domElement,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
  )
}