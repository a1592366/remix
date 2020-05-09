import RemixMaxHeap from './RemixMaxHeap';
import { performance, nextTick } from './RemixShared';
import { renderWithHooks } from './RemixHook';
import { createWorkInProgress, useFiber } from './RemixFiber';
import { RemixViewController } from './RemixViewController';
import { DOMUpdateQueue } from './RemixDOMUpdator';
import { SYNC } from './RemixShared';
import { 
  createFiberFromElement, 
  createFiberFromFragment, 
  createFiberFromText 
} from './RemixFiber';
import { 
  createInstance, 
  appendChild, 
  insertBefore, 
  setDOMProperties, 
  appendChildToContainer, 
  insertInContainerBefore, 
  createTextInstance, 
  updateTextInstance,
  updateInstance
} from './RemixHostConfig';
import { 
  UPDATE_STATE, 
  CONTENT_RESET, 
  UPDATE, 
} from './RemixShared';
import { 
  PLACEMENT, 
  DELETION, 
  CALLBACK, 
  PERFORMED, 
  PLACEMENT_AND_UPDATE, 
  REF, 
  PASSIVE 
} from './RemixShared';
import { 
  HOST_TEXT , 
  HOST_COMPONENT, 
  FUNCTION_COMPONENT, 
  HOST_ROOT, 
  FRAGMENT, 
  HOST_PORTAL 
} from './RemixShared';
import { 
  REACT_ELEMENT_TYPE, 
  REACT_FRAGMENT_TYPE 
} from './RemixShared';

import {
  WORKING, 
  NO_WORK
} from './RemixShared';

// 全局函数
let RemixRootFiber = { current: null };
let RemixHeap = new RemixMaxHeap();
let RmeixDeadline = 0;
let nextUnitOfWork = null;
let firstEffect =  null;
let nextEffect = null;
let didReceiveUpdate = false;
let isRendering = false;
let isCommiting = false;
let isWorking = false;

const isArray = Array.isArray;

RemixHeap.gt = function (child, parent) {
  if (child === RemixViewController.current) {
    return true;
  } else if (parent === RemixViewController.current) {
    return false;
  }

  return child.expiration > child.expiration;
}

// ---- typeOf ----
function typeOf (object) {
  let type = typeof object;

  if (isArray(object)) {
    type = 'array';
  } else if (type === 'object') {
    type = object === null ? 'null' : type;
  }

  return type;
}

// --- Priority  ----
function createPriorityRootNode (root) {
  root.expiration = performance.now() + 30;

  return root;
}

// ---- update ----
function createUpdate () {
  return {
    tag: UPDATE_STATE,
    expirationTime: null,
    next: null,
    payload: null
  }
}

function createUpdateQueue (baseState) {
  return {
    baseState,
    firstUpdate: null,
    lastUpdate: null,
    nextEffect: null,
    firstEffect: null,
    lastEffect: null
  }
}

function enqueueUpdate (fiber, update) {
  const { alternate } = fiber;

  // 如果备胎不存在，首次渲染
  if (alternate === null) {
    // 尚未初始化 updateQueue
    if (fiber.updateQueue === null) {
      fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
    }
  }

  const updateQueue = fiber.updateQueue;

  if (updateQueue.lastUpdate === null) {
    updateQueue.firstUpdate = updateQueue.lastUpdate = update;
  } else {
    firstUpdate = updateQueue.firstUpdate;

    updateUpdate.firstUpdate = update;
    update.next = firstUpdate;
  }
}

// ---- schedule ----
function scheduleRootUpdate (current, element, callback) {
  const update = createUpdate();

  update.payload = { element }

  if (typeof callback === 'function') {
    update.callback = callback;
  }

  enqueueUpdate(current, update);
  scheduleWork(current, SYNC);
}

// 获取优先级
function findTheHighestPriorityRoot (root) {
  if (typeof root.expiration === 'undefined') {
    root = createPriorityRootNode(root);
  }

  RemixHeap.push(root);

  return RemixHeap.peek();
}

export function scheduleWork (current, sync) {
  let fiber = current;

  current.workTag = WORKING;

  while (fiber) {
    if (fiber.tag === HOST_ROOT) {
      break;
    }

    fiber = fiber.return;
  }

  const internalRoot = fiber.stateNode.__internalRoot;
  const root = findTheHighestPriorityRoot(internalRoot);

  requestWork(root, sync);
}

function flushWork () {

}

// ---- update --- 


// --- begin work ----
function requestWork (root, sync) {
  if (!isCommiting) {
    if (nextUnitOfWork === null) {
      nextUnitOfWork = createWorkInProgress(root.current, null);
  
      performWork(root, sync);
    
      if (nextUnitOfWork !== null) {
        flushWork();
      } else {
        if (RemixHeap.length > 0) {
          RemixHeap.pop();

          const root = RemixHeap.peek();

          if (root) {
            requestWork(root);
          }
        }
      }
    }
  }
}

function performWork (root, sync) {
  workLoop(sync);

  if (nextUnitOfWork === null) {
    const { current } = root;
    root.finishedWork = current.alternate;

    commitRoot(root);
  }
}

function workLoop (sync) {

  workLoop: while (
    nextUnitOfWork !== null &&  // 已经完成循环
    !shouldYield(sync)              // 没有空余时间处理
  ) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
}

function performUnitOfWork (workInProgress) {
  const current = workInProgress.alternate;

  let next = beginWork(current, workInProgress);
  workInProgress.memoizedProps = workInProgress.pendingProps;

  if (next === null) {
    next = completeUnitOfWork(workInProgress);
  }

  return next;
}

function beginWork (current, workInProgress) {
  if (current !== null && workInProgress.workTag !== WORKING) {
    const props = current.memoizedProps;
    const pendingProps = workInProgress.pendingProps;

    if (
      workInProgress.type !== current.type ||
      props !== pendingProps
    ) {
      didReceiveUpdate = true;
    } else {
      didReceiveUpdate = false;
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }
  }

  workInProgress.workTag = NO_WORK;
  
  switch (workInProgress.tag) {
    case HOST_ROOT: {
      const Component = workInProgress.type;

      return updateHostRoot(
        current,
        workInProgress,
        Component
      )
    }

    case FUNCTION_COMPONENT: {
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps);

      return updateFunctionComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
      );
    }

    case HOST_COMPONENT: {
      return updateHostComponent(
        current,
        workInProgress
      );
    }

    case HOST_TEXT: {
      return null;
    }

    case FRAGMENT: {
      return updateFragment(
        current, 
        workInProgress
      );
    }
  }

}

// ---- complete work ----
function completeUnitOfWork (workInProgress) {  
  while (true) {
    let {
      alternate: current,
      return: returnFiber,
      sibling: siblingFiber,
      effectTag
    } = workInProgress;

    completeWork(
      current,
      workInProgress,
    );

    // if (effectTag > PERFORMED) {
    //   if (firstEffect === null) {
    //     firstEffect = nextEffect = workInProgress;
    //   } else {
    //     workInProgress.nextEffect = firstEffect;
    //     firstEffect = workInProgress;
    //   }
    // }

    if (returnFiber !== null) {
      siblingFiber = workInProgress.sibling;

      if (siblingFiber !== null) {
        return siblingFiber;
      }

      workInProgress = returnFiber;
    } else {
      return null;
    }
  }
}

function  completeWork (
  current,
  workInProgress,
) {
  const pendingProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case HOST_ROOT: {
      const instance = workInProgress.stateNode;
    }

    case HOST_COMPONENT: {
      const type = workInProgress.type;
      const instance = workInProgress.stateNode;

      if (current !== null && instance !== null) {
        const props = current.memoizedProps;

        if (props !== pendingProps) {
          const instance = workInProgress.stateNode;
          updateInstance(instance, pendingProps, workInProgress);
          setDOMProperties(type, instance, pendingProps);
        }
      } else {
        const instance = createInstance(
          type,
          pendingProps,
          workInProgress
        );

        setDOMProperties(type, instance, pendingProps);

        workInProgress.stateNode = instance;
      }

      break;
    }

    case HOST_TEXT: {
      const instance = workInProgress.stateNode;

      if (current !== null && instance !== null) {
        updateTextInstance(instance, pendingProps);
      } else {
        const instance = createTextInstance(pendingProps);

        workInProgress.stateNode = instance;
      }
    }

  }

  return null;
}
// ---- update ----
// ---- updateFragment ----
function updateFragment (
  current,
  workInProgress
) {
  const children = workInProgress.pendingProps;

  reconcileChildren(
    current, 
    workInProgress, 
    workInProgress.child, 
    children
  );

  return workInProgress.child;
}
// ---- updateHostComponent ----
function updateHostComponent (
  current,
  workInProgress
) {
  const {
    pendingProps
  } = workInProgress;

  let children = pendingProps.children;

  if (
    typeof children === 'string' ||
    typeof children === 'number'
  ) {
    children = null;
  }

  reconcileChildren(
    current,
    workInProgress, 
    workInProgress.child,
    children
  );

  return workInProgress.child;
}

// ----> updateFunctionComponent
function updateFunctionComponent (current, workInProgress, Component, nextProps) {
  let children = renderWithHooks(current, workInProgress, Component, nextProps);

  if (current !== null && !didReceiveUpdate) {
    return bailoutHooks(current, workInProgress)
  } else {
    workInProgress.effectTag |= PERFORMED;

    reconcileChildren(
      current, 
      workInProgress, 
      workInProgress.child, 
      children
    );
  }

  return workInProgress.child;
}

function bailoutHooks (
  current,
  workInProgress
) {
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.effectTag &= ~(PASSIVE | UPDATE);

  return workInProgress.child;
}

// ---- updateHostROot ----

function updateHostRoot (current, workInProgress) {
  const updateQueue = workInProgress.updateQueue;
  const memoizedState = workInProgress.memoizedState;
  const children = memoizedState !== null ? 
    memoizedState.element : null;

  if (updateQueue.lastUpdate !== null) {
    let update = updateQueue.firstUpdate;
    let baseState = update.payload;
  
    if (typeof update.callback === 'function') {
      workInProgress.effectTag |= CALLBACK;
      update.nextEffect = null;
  
      if (updatQueue.lastEffect === null) {
        updatQueue.firstEffect = updatQueue.lastEffect = update;
      } else {
        updatQueue.lastEffect.nextEffect = update;
        updatQueue.lastEffect = update;
      }
    }
  
    update.next = null;
    updateQueue.firstUpdate = null;
    updateQueue.lastUpdate = null;
  
    updateQueue.baseState = baseState;
    workInProgress.memoizedState = baseState;
  }

  const nextState = workInProgress.memoizedState;
  const nextChildren = nextState.element;

  if (children === nextChildren) {
    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }

  reconcileChildren(
    current, 
    workInProgress, 
    workInProgress.child, 
    nextChildren
  );

  return workInProgress.child;
}

// ---- reconicle ----
function reconcileChildren (
  current, 
  workInProgress, 
  currentFiber, 
  children
) {
  const shouldTrackSideEffects = current !== null;
  const returnFiber = workInProgress;
  const type = typeOf(children);

  switch (type) {
    case 'object': {
      const { $$typeof } = children;

      if ($$typeof === REACT_ELEMENT_TYPE) {
        const childFiber = placeSingleChild(
          reconcileSingleElement(
            returnFiber, 
            currentFiber, 
            children, 
            shouldTrackSideEffects
          )
        );

        childFiber.return = returnFiber;
        returnFiber.child = childFiber;

        return childFiber;
      } else {
        debugger;
      }
    }

    case 'number':
    case 'string': {
      const childFiber = createFiberFromText(children);

      childFiber.return = returnFiber;
      returnFiber.child = childFiber;

      return placeSingleChild(childFiber, shouldTrackSideEffects);
    }

    case 'array': {
      const childFiber = reconcileChildrenArray(
        returnFiber,
        currentFiber,
        children,
        shouldTrackSideEffects
      );

      childFiber.return = returnFiber;
      returnFiber.child = childFiber;

      return childFiber;
    }

    default:
      return null;
  }
}

function bailoutOnAlreadyFinishedWork (current, workInProgress) {
  cloneChildFibers(current, workInProgress);
  return workInProgress.child;
}

function cloneChildFibers (current, workInProgress) {
  if (workInProgress.child === null) {
    return null;
  }

  let child = workInProgress.child;
  let newChild = createWorkInProgress(child, child.pendingProps);
  workInProgress.child = newChild;

  newChild.return = workInProgress;

  while (child.sibling !== null) {
    child = child.sibling;
    newChild = newChild.sibling = createWorkInProgress(child, child.pendingProps);
    newChild.return = workInProgress;
  }

  newChild.sibling = null;
}

function reconcileSinglePortal () {

}

function reconcileChildrenArray (
  returnFiber,
  currentFiber,
  children,
  shouldTrackSideEffects
) {
  let prevFiber = null;
  let childIndex = 0;
  const length = children.length;

  if (shouldTrackSideEffects) {
    diff: do {
      const element = children[childIndex];
      const type = typeOf(element);
      let childFiber = null;

      const { memoizedProps, tag } = currentFiber;

      if (currentFiber.index === childIndex) {
        switch (type) {
          case 'array': { 
            if (memoizedProps.length !== element.length) {
              break diff;
            }

            childFiber = useFiber(currentFiber, element);
            break;
          }

          case 'object': {
            const $$typeof = element.$$typeof;

            if ($$typeof === REACT_ELEMENT_TYPE) {
              if (
                currentFiber.key !== element.key ||
                currentFiber.elementType !== element.type 
              ) {
                break diff;
              } 

              childFiber = useFiber(currentFiber, element.props);
            } else {

            }
            break;
          }

          case 'string':
          case 'number': {
            if (tag !== HOST_TEXT) {
              break diff;
            }

            childFiber = useFiber(currentFiber, element);
            break;
          }
          default:
            break;
        }

      } else {
        break;
      }

      currentFiber = currentFiber.sibling;
      childIndex++;

      if (childFiber !== null) {
        childFiber.index = childIndex;
        childFiber.return = returnFiber;
        childFiber.effectTag |= PLACEMENT;
  
        prevFiber !== null ?
          prevFiber.sibling = childFiber : 
          returnFiber.child = childFiber;
  
        prevFiber = childFiber;
      }
    } while (
      childIndex < length && 
      currentFiber !== null
    );

    if (currentFiber.sibling !== null) {
      deleteRemainingChildren(returnFiber, currentFiber, shouldTrackSideEffects);
    }
  } 

  do {
    const element = children[childIndex];
    const type = typeOf(element);
    let childFiber = null;

    switch (type) {
      case 'array': {
        childFiber = createFiberFromFragment(element);
        break;
      }

      case 'object': {
        const { $$typeof } = element;

        childFiber = $$typeof === REACT_ELEMENT_TYPE ?
          createFiberFromElement(element) :
          createFiberFromFragment(element);
        break;
      }

      case 'number':
      case 'string': {
        childFiber = createFiberFromText('' + element);
        break;
      }
    }

    if (childFiber !== null) {
      childFiber.index = childIndex;
      childFiber.return = returnFiber;
      childFiber.effectTag |= PLACEMENT;

      prevFiber !== null ?
        prevFiber.sibling = childFiber : 
        returnFiber.child = childFiber;

      placeSingleChild(childFiber, shouldTrackSideEffects);

      prevFiber = childFiber;
    }
    
    childIndex++;
  } while (childIndex < length);

  // returnFiber[INTERNAL_CHILDREN] = children;
  
  return returnFiber.child;
}

function placeSingleChild (fiber, shouldTrackSideEffects) {
  if (!shouldTrackSideEffects && fiber.alternate === null) {
    fiber.effectTag |= PLACEMENT;

    nextEffect = nextEffect === null ?
      fiber : nextEffect.nextEffect = fiber;
  }

  return fiber;
}

function reconcileSingleElement (returnFiber, currentFiber, element, shouldTrackSideEffects) {
  const key = element.key;
  const elementType = element.type;
  let child = currentFiber;

  while (child !== null) {
    if (child.key === key) {
      if (child.tag === FRAGMENT) {
        if (element.type === REACT_FRAGMENT_TYPE) {
          deleteRemainingChildren(returnFiber, child.sibling);
          const fiber = useFiber(child, element.props.children);
          fiber.return = returnFiber;
         
          return fiber;
        }
      } else {
        if (child.elementType === element.type) {
          const fiber = useFiber(child, element.props);
          fiber.return = returnFiber;

          return fiber;
        }
      }

      deleteRemainingChildren(returnFiber, child, shouldTrackSideEffects);
      break;
    } else {
      deleteChild(child, shouldTrackSideEffects);
    }

    child = child.sibling;
  }

  let newFiber;

  if (elementType === REACT_FRAGMENT_TYPE) {

  } else {
    newFiber = createFiberFromElement(element);
    newFiber.return = returnFiber;
  }

  return newFiber;
}

function deleteRemainingChildren(
  returnFiber,
  currentFiber,
  shouldTrackSideEffects
) {
  let child = currentFiber;
  while (child) {
    deleteChild(returnFiber, child, shouldTrackSideEffects);
    child = child.sibling;
  }
}

function deleteChild (
  child, 
  shouldTrackSideEffects
) {
  if (shouldTrackSideEffects) {
    child.effectTag = DELETION;

    nextEffect = nextEffect === null ?
      fiber : nextEffect.nextEffect = fiber;
  }
}

function createChild (
  returnFiber,
  child,
) {
  const type = typeOf(child);

  switch (type) {
    case 'string':
    case 'number': {
      const fiber = createFiberFromText('' + child);
      fiber.return = returnFiber;
      return fiber;
    }

    case 'object': {
      switch (child.$$typeof) {
        case REACT_ELEMENT_TYPE: {
          const fiber = createFiberFromElement(child);
          fiber.return = returnFiber;
          return fiber;
        }
        case REACT_PORTAL_TYPE: {
          const fiber = createFiberFromPortal(child);
          fiber.return = returnFiber;
          return fiber;
        }
      }
    }

    case 'array': {
      const fiber = createFiberFromFragment(child, key);
      fiber.return = returnFiber;
      return fiber;
    }
  }

  return null;
}

// ---- commit work ----
function commitRoot (root) {
  const finishedWork = root.finishedWork;

  finishedWork.nextEffect = firstEffect;
  firstEffect = finishedWork;

  isCommiting = true;

  if (firstEffect !== null) {
    nextEffect = firstEffect;

    do {
      commitMutationEffects();

      nextEffect = nextEffect.nextEffect;

    } while (nextEffect !== null);
  }

  

  firstEffect = null;
  nextEffect = null;

  root.current = root.finishedWork;
  root.finishedWork = null
  isCommiting = false;

  DOMUpdateQueue(finishedWork);
}

function commitMutationEffects () {
  const effectTag = nextEffect.effectTag;

  debugger;

  if (effectTag & CONTENT_RESET) {

  }

  if (effectTag & REF) {

  }

  switch (effectTag & (PLACEMENT | UPDATE | DELETION)) {
    case PLACEMENT: {
      commitPlacement(nextEffect);
      nextEffect.effectTag &= ~PLACEMENT;
      break;
    }

    case PLACEMENT_AND_UPDATE: {
      commitPlacement(nextEffect);
      nextEffect.effectTag &= ~PLACEMENT;

      commitUpdate(nextEffect);
      nextEffect.effectTag &= ~UPDATE;
      break;
    }

    case UPDATE: {
      commitUpdate(nextEffect);
      nextEffect.effectTag &= ~UPDATE;
      break;
    }

    case DELETION: {
      debugger;
      commitDeletion(nextEffect);
    }
  }
}

function commitDeletion (fiber) {
  fiber.return = null;
  fiber.child = null;
  fiber.memoizedState = null;
  fiber.updateQueue = null;
  
  const alternate = fiber.alternate;

  if (alternate !== null) {
    alternate.return = null;
    alternate.child = null;
    alternate.memoizedState = null;
    alternate.updateQueue = null;
  }
}

function commitPlacement (
  fiber
) {
  let parentFiber = fiber.return;
  
  while (parentFiber !== null) {
    if (isHostParentFiber(parentFiber)) {
      break;
    }

    parentFiber = parentFiber.return;
  }

  if (parentFiber === null) {
    debugger;
  }

  const tag = parentFiber.tag;
  let isContainer = false;
  let parentNode = parentFiber.stateNode;

  if (tag === HOST_COMPONENT) {
    isContainer = false;
  } else if (
    tag === HOST_ROOT ||
    tag === HOST_PORTAL
  ) {
    isContainer = true;
  }

  const before = getHostSibling(fiber);
  const { tag: fiberTag, stateNode } = fiber;
  const isHost = (
    fiberTag === HOST_COMPONENT || 
    fiberTag === HOST_TEXT
  );

  if (isHost) {
    if (before) {
      if (isContainer) {
        insertInContainerBefore(parentNode, stateNode, before);
      } else {
        insertBefore(parentNode, stateNode, before);
      }
    } else {
      if (isContainer) {
        appendChildToContainer(parentNode, stateNode);
      } else {
        appendChild(parentNode, stateNode);
      }
    }
  }
}

function isHostParentFiber({ tag }) {
  return tag === HOST_COMPONENT || tag === HOST_ROOT || tag === HOST_PORTAL;
}

function getHostSibling(fiber) {
  let node = fiber;
  siblings: while (true) {
    while (node.sibling === null) {
      if (node.return === null || isHostParentFiber(node.return)) {
        return null;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
    while (node.tag !== HOST_COMPONENT && node.tag !== HOST_TEXT) {
      if (node.effectTag & PLACEMENT) {
        continue siblings;
      }
      
      if (node.child === null || node.tag === HOST_PORTAL) {
        continue siblings;
      } else {
        node.child.return = node;
        node = node.child;
      }
    }
    if (!(node.effectTag & PLACEMENT)) {
      return node.stateNode;
    }
  }
}

function commitUpdate () {
  debugger;
}


// --- shared ----

function shouldYield (sync) {
  if (sync === SYNC) {
    return false;
  }
}

// --- export ---
export function updateContainer (element, container, callback) {
  const { current } = container;

  return scheduleRootUpdate(
    current,
    element,
    callback
  );
}

export function markWorkInProgressReceivedUpdate () {
  didReceiveUpdate = true;
}