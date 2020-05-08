import { HOST_ROOT, FUNCTION_COMPONENT, HOST_COMPONENT, HOST_TEXT, FRAGMENT, WORKING } from './RemixShared';
import { INTERNAL_CHILDREN } from './RemixShared';
import { NO_EFFECT } from './RemixShared';
import { NO_WORK } from './RemixShared';



export function createFiber (tag, pendingProps, key) {
  return {
    tag,        // 
    key,
    pendingProps,

    memoizedProps: null,
    memoizedState: null,

    return: null,
    child: null,
    sibling: null,

    alternate: null,
    effectTag: NO_EFFECT,
    nextEffect: null,
    lastEffect: null,
    firstEffect: null,

    stateNode: null,
    alternate: null,
    index: 0,

    updateQueue: null,
    workTag: NO_WORK,
    [INTERNAL_CHILDREN]: null,
  }
}

export function createWorkInProgress (
  current, 
  pendingProps
) {
  let { alternate: workInProgress } = current;

  if (workInProgress === null) {
    const { 
      tag,
      key,
      type,
      elementType,
      stateNode
    } = current;

    workInProgress = createFiber(tag, pendingProps, key);
    workInProgress.elementType = elementType;
    workInProgress.type = type;
    workInProgress.stateNode = stateNode;
    workInProgress.workTag = WORKING;
    
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;
    workInProgress.effectTag = NO_EFFECT;
    workInProgress.nextEffect = null;
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;
  }

  const { 
    child, 
    memoizedProps, 
    memoizedState, 
    updateQueue, 
    sibling,
    index,
    ref,
  } = current;

  workInProgress.child = child;
  workInProgress.memoizedProps = memoizedProps;
  workInProgress.memoizedState = memoizedState;
  workInProgress.sibling = sibling;
  workInProgress.index = index;
  workInProgress.ref = ref;
  workInProgress.updateQueue = updateQueue;

  return workInProgress;
}

export function createFiberFromElement (element) {
  const {
    _owner: owner,
    key,
    type,
    props: pendingProps
  } = element;
  
  const fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner);
  
  return fiber;
}
export function createFiberFromTypeAndProps (type, key, pendingProps, owner) {
  let fiberTag = FUNCTION_COMPONENT;  
  let resolvedType = type;

  if (typeof type === 'function') {
    fiberTag = FUNCTION_COMPONENT;
  } else if (type === 'object') {
    if (typeof type.render === 'function') {
      fiberTag = OBJECT_COMPONENT;
    } else {
      throw new Error(`Unsupport component type`);
    }
  } else if (typeof type === 'string') {
    fiberTag = HOST_COMPONENT;
  }

  const fiber = createFiber(fiberTag, pendingProps, key);
  fiber.elementType = type;
  fiber.type = resolvedType;
  
  return fiber;
}
export function createFiberFromFragment (elements) {
  return createFiber(FRAGMENT, elements);
}
export function createFiberFromText (content) {
  return createFiber(HOST_TEXT, content);
}
export function createFiberFromPortal () {}

export function createFiberRoot (containerInfo) {
  const uninitializedFiber = createHostRootFiber();

  uninitializedFiber.stateNode = containerInfo;

  return {
    current: uninitializedFiber,
    containerInfo
  }
}

export function useFiber (
  fiber, 
  pendingProps
) {
  const clone = createWorkInProgress(fiber, pendingProps);
  clone.index = 0;
  clone.sibling = null;
  return clone;
}

// --- internal ----
function createHostRootFiber () {
  return createFiber(HOST_ROOT, null, null);
}