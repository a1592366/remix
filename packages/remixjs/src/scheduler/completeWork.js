import { request } from 'requestidlecallback';
import { EXPIRE_TIME, EMPTY_REFS, EMPTY_CONTEXT } from '../shared';
import { HOST_ROOT, HOST_COMPONENT, FUNCTION_COMPONENT, CLASS_COMPONENT, HOST_TEXT, FRAGMENT } from '../shared/workTags';
import { PERFORMED, PLACEMENT, UPDATE, PERFORMED_WORK, REF, SNAPSHOT, INCOMPLETE, NO_EFFECT } from '../shared/effectTags';
import { resolveDefaultProps, shallowEqual } from '../shared';
import { createWorkInProgress } from '../reconciler/Fiber';
import { reconcileChildren, cloneChildFibers } from '../reconciler';
import { commitRoot } from './commitWork';
import { 
  createInstance, 
  diffProperties,
  appendAllChildren,
  setInitialProperties,
} from '../renderer/config';
import { 
  createUpdate, 
  enqueueUpdate, 
  processUpdateQueue, 
  resetHasForceUpdateBeforeProcessing, 
  checkHasForceUpdateAfterProcessing
} from './updateQueue';
import ReactCurrentRoot from '../react/ReactCurrentRoot';

export function completeUnitOfWork (unitOfWork) {
  let workInProgress = unitOfWork;

  // 收集 effect
  while (workInProgress) {
    const current = workInProgress.alternate;
    const returnFiber = workInProgress.return;
    
    if ((workInProgress.effectTag & INCOMPLETE) === NO_EFFECT) {
      let next = completeWork(current, workInProgress);
      // 如果没有了 next
      if (next !== null) {
        return next;
      }
      
      // 如果存在 returnfiber 且 父fiber 没有 副作用
      if (returnFiber !== null &&
        (returnFiber.effectTag & INCOMPLETE) === NO_EFFECT
      ) {
        // 设置 firstEffect 给 父fiber
        if (returnFiber.firstEffect === null) {
          returnFiber.firstEffect = workInProgress.firstEffect;
        }

        // 如果当前 workInProgress lastEffect 存在
        if (workInProgress.lastEffect !== null) {
          // 将父fiber effect 与 workInProgress 链接起来
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
          }

          // 设置父fiber lastEffect
          returnFiber.lastEffect = workInProgress.lastEffect;
        }

        // 如果 workInProgress 存在副作用，则根据 父fiber的 lastEffect来链接
        const effectTag = workInProgress.effectTag;
        if (effectTag > PERFORMED_WORK) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress;
          } else {
            returnFiber.firstEffect = workInProgress;
          }
          returnFiber.lastEffect = workInProgress;
        }
      }
      
    } else {
      debugger;
      console.log(123);
    }

    const sibling = workInProgress.sibling;

    // 处理 sibling 
    if (sibling !== null) {
      return sibling;
    } 
  
    workInProgress = returnFiber;
  }

  return null;
}

function getRootHostContainer () {
  const root = ReactCurrentRoot.current._internalRoot;
  return root.containerInfo;
}

function completeWork (current, workInProgress) {
  const newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case HOST_ROOT: {
      // const fiberRoot = WIP.instanceNode;
      if (current === null || current.child === null) {
        workInProgress.effectTag &= ~PLACEMENT;
      }
      // updateHostContainer(WIP);
      return null;
    }
    case HOST_COMPONENT: {
      const rootContainerInstance = getRootHostContainer();
      const type = workInProgress.type;

      if (
        current !== null && 
        workInProgress.stateNode !== null
      ) {
        updateHostComponent(
          current,
          workInProgress,
          type,
          newProps,
          rootContainerInstance,
        );
      } else {
        if (newProps) {
          const instance = createInstance(
            type,
            newProps,
            rootContainerInstance,
            workInProgress,
          );
  
          appendAllChildren(instance, workInProgress);
          setInitialProperties(instance, type, newProps, rootContainerInstance);
          
          workInProgress.stateNode = instance;
        }
      }

      break;
    }
    case HOST_TEXT: {
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
    case FRAGMENT: {
      return null;
    }
    default:
      return null;
  }

  return null;
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
  commitRoot(root, finishedWork);
}

function prepareUpdate (
  instance, 
  type,
  oldProps,
  newProps,
  rootContainerInstance
) {
  return diffProperties(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
  )
}