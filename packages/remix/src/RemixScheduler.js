import { renderWithHooks } from './RemixHook';
import { createWorkInProgress, createFiber } from './RemixFiber';
import { UPDATE_STATE, NO_EFFECT, CONTENT_RESET, UPDATE, HOST_TEXT } from './RemixShared';
import { ASYNC, SYNC } from './RemixShared';
import { INTERNAL_FIBER_KEY } from './RemixShared';
import { PLACEMENT, DELETION, CALLBACK, PERFORMED, PLACEMENT_AND_UPDATE, REF, INCOMPLETE } from './RemixShared';
import { HOST_COMPONENT, FUNCTION_COMPONENT, HOST_ROOT, FRAGMENT, HOST_PORTAL } from './RemixShared';
import { REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE } from './RemixShared';
import { createFiberFromElement, createFiberFromFragment, createFiberFromText } from './RemixFiber';
import { createInstance, appendChild, insertBefore, setDOMProperties, appendChildToContainer, insertInContainerBefore, createTextInstance } from './RemixHostConfig';
import { DOMUpdateQueue } from './RemixDOMUpdator';

const isArray = Array.isArray;

// 全局函数
let RemixRootFiber = { current: null };
let nextUnitOfWork = null;
let firstEffect =  null;
let nextEffect = null;
let isRendering = false;
let isCommiting = false;
let isWorking = false;

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

function processUpdateQueue (
  workInProgress, 
  updateQueue, 
  pendingProps
) {
  if (updateQueue !== null) {
    let update = updateQueue.firstUpdate;
    let state = updateQueue.baseState;

    while (update) {
      state = {
        ...update.state
      };

      update = update.next;
    }

    workInProgress.pendingState
  }
}

// ---- schedule ----
function scheduleRootUpdate (current, element, callback) {
  const update = createUpdate();

  update.payload = {
    element
  }

  if (typeof callback === 'function') {
    update.callback = callback;
  }

  RemixRootFiber.current = current;

  enqueueUpdate(current, update);
  scheduleWork(current, SYNC);
}

function scheduleWork (current, sync) {
  let fiber = current;

  while (fiber) {
    if (fiber.tag === HOST_ROOT) {
      break;
    }

    fiber = fiber.return;
  }

  const internalRoot = fiber.stateNode.__internalRoot;

  requestWork(internalRoot, sync);
}

function flushWork () {

}

// ---- update --- 


// --- begin work ----
function requestWork (root, sync) {
  if (nextUnitOfWork === null) {
    nextUnitOfWork = createWorkInProgress(root.current, null);

    performWork(root, sync);
  
    if (nextUnitOfWork !== null) {
      flushWork();
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
  // 无须更新
  // todo

  // 
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

    if (effectTag > PERFORMED) {
      if (firstEffect === null) {
        firstEffect = nextEffect = workInProgress;
      } else {
        workInProgress.nextEffect = firstEffect;
        firstEffect = workInProgress;
      }
    }

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
        const props = workInProgress.memoizedProps;

        if (props !== pendingProps) {
          const instance = workInProgress.stateNode;
          debugger;
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
        debugger;
      } else {
        const instance = createTextInstance(
          pendingProps
        );

        workInProgress.stateNode = instance;
      }
    }

  }

  return null;
}
// ---- update ----

// ---- updateHostComponent ----
function updateHostComponent (
  current,
  workInProgress
) {
  const {
    pendingProps
  } = workInProgress;

  let children = pendingProps.children;
  const typeOfChildren = typeof children;

  if (typeOfChildren === 'string' || typeOfChildren === 'number') {
    children = null;
  }

  if (children === null) {
    return null;
  }

  workInProgress.child = reconcileChildren(
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

  } else {
    workInProgress.effectTag |= PERFORMED;
    workInProgress.child = reconcileChildren(current, workInProgress, workInProgress.child, children);
  }


  return workInProgress.child;
}

function bailoutHooks () {

}

// ---- updateHostROot ----

function updateHostRoot (current, workInProgress) {
  const updateQueue = workInProgress.updateQueue;
  const memoizedState = workInProgress.memoizedState;
  const children = memoizedState !== null ? 
    memoizedState.element : null;

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

  const nextState = workInProgress.memoizedState;
  const nextChildren = nextState.element;

  if (children === nextChildren) {
    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }

  workInProgress.child = reconcileChildren(current, workInProgress, workInProgress.child, nextChildren);

  return workInProgress.child;
}

// ---- reconicle ----
function reconcileChildren (current, workInProgress, currentFiber, children) {
  const type = typeof children;
  const shouldTrackSideEffects = current !== null;
  const returnFiber = workInProgress;

  if (type === 'object' && children !== null) {
    if (children.$$typeof === REACT_ELEMENT_TYPE) {
      const childFiber = reconcileSingleElement(
        returnFiber, 
        currentFiber, 
        children, 
        shouldTrackSideEffects
      );

      return placeSingleChild(childFiber, shouldTrackSideEffects);
    } else if (children.$$typeof === REACT_FRAGMENT_TYPE) {
      const childFiber = reconcileSinglePortal(
        returnFiber,
        currentFiber,
        children,
        shouldTrackSideEffects
      );

      return placeSingleChild(childFiber, shouldTrackSideEffects);
    }
  } 
  
  if (type === 'string' || type === 'number') {
    const childFiber = createFiberFromText(children);

    childFiber.return = returnFiber;

    return placeSingleChild(childFiber, shouldTrackSideEffects);
  } else if (isArray(children)) {
    return reconcileChildrenArray(
      returnFiber, 
      currentFiber, 
      children, 
      shouldTrackSideEffects
    );
  }

  return  null;
}

function bailoutOnAlreadyFinishedWork () {

}

function reconcileChildrenArray (
  returnFiber,
  currentFiber,
  children,
  shouldTrackSideEffects
) {
  if (children) {
    
    let index = 0;
    let firstChild = currentFiber;
    const length = children.length;
  
    if (shouldTrackSideEffects) {
      let firstChild = currentFiber;
      let child = firstEffect;
    } 
  
    let prevFiber = null;
    
    for (; index < length; index++ ) {
      let child = children[index];
      let fiber;
      const type = typeof child;

      if (child !== null) {

        if (isArray(child)) {
          fiber = createFiberFromFragment(child);
        } else if (
          type === 'object' && 
          child !== null
        ) {
          const $$typeof = child.$$typeof;
          if ($$typeof === REACT_ELEMENT_TYPE) {
            fiber = createFiberFromElement(child);
          } else if ($$typeof === REACT_FRAGMENT_TYPE) {
            fiber = createFiberFromFragment(child);
          }
        } else if (
          type === 'string' || 
          type === 'number'
        ) {
          fiber = createFiberFromText('' + child);
        }
    
        fiber[INTERNAL_FIBER_KEY] = `.${index}${child.key === null ? 
            '' : `[${child.key}]` }`;
    
        if (prevFiber === null) {
          returnFiber.child = fiber;
        } else {
          prevFiber.sibling = fiber;
        }
    
        prevFiber = fiber;
        fiber.return = returnFiber;
        fiber.effectTag |= PLACEMENT;
      }
    }
  }

  return returnFiber.child;
}

function placeSingleChild (fiber, shouldTrackSideEffects) {
  if (!shouldTrackSideEffects && fiber.alternate === null) {
    fiber.effectTag |= PLACEMENT;
  }
  return fiber;
}

function reconcileSingleElement (returnFiber, currentFiber, element, shouldTrackSideEffects) {
  const key = element.key;
  const elementType = element.type;
  let child = currentFiber;

  while (child) {
    if (child.key === key) {
      if (child.elementType !== elementType) {
        if (shouldTrackSideEffects) {
          deleteRemainingChildren(returnFiber, child);
        }
        break;
      }
    } else {
      if (shouldTrackSideEffects) {
        deleteChild(returnFiber, child);
      }
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
  deleteRemainingChildren
) {
  let child = currentFiber;
  while (child) {
    deleteChild(returnFiber, child);
    child = child.sibling;
  }
}

function deleteChild (returnFiber, child) {
  if (child.current) {
    child.effectTag |= DELETION;
  }
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

function commitBeforeMutationLifeCycles (
  current,
  finishedWork
) {}

function commitMutationEffects () {
  const effectTag = nextEffect.effectTag;

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