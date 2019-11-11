import { isNull } from '../shared/is';
import { HOST_ROOT, HOST_TEXT, INDETERMINATE_COMPONENT, CLASS_COMPONENT, HOST_COMPONENT } from '../shared/workTags';
import { NO_EFFECT } from '../shared/effectTags';


export function createWorkInProgress (current, pendingProps) {
  let { alternate: workInProgress } = current;

  if (isNull(workInProgress)) {
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
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;
    workInProgress.effectTag = NO_EFFECT;
  }

  const { 
    child, 
    memoizedProps, 
    memoizedState, 
    updateQueue, 
    sibling,
    status,
    index,
    ref,
  } = current;

  workInProgress.status = status;
  workInProgress.child = child;
  workInProgress.memoizedProps = memoizedProps;
  workInProgress.memoizedState = memoizedState;
  workInProgress.sibling = sibling;
  workInProgress.index = index;
  workInProgress.ref = ref;
  workInProgress.updateQueue = updateQueue;

  return workInProgress;
}

export function createFiberRoot (container) {
  const uninitializedFiber = createFiber(HOST_ROOT, null, null);

  const root = {
    containerInfo: container,
    current: uninitializedFiber,
    didError: false,
    finishedWork: null,
  }

  uninitializedFiber.stateNode = root;

  return root;
}

export function createFiberFromText (content) {
  const fiber = createFiber(HOST_TEXT, content, null);
  return fiber;
}

export function createFiberFromElement(element) {
  const owner = element._owner;
  const type = element.type;
  const key = element.key;
  const pendingProps = element.props;
  const fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner);
  
  return fiber;
}

export function createFiberFromFragment(elements, key) {
  var fiber = createFiber(Fragment, elements);
  return fiber;
}

function createFiberFromTypeAndProps(
  type, // React$ElementType
  key, 
  pendingProps,
  owner
) {
  let fiber;
  let fiberTag = INDETERMINATE_COMPONENT;
  const resolvedType = type;
  if (typeof type === 'function') {
    const prototype = type.prototype;
    if (prototype && prototype.isReactComponent) {
      fiberTag = CLASS_COMPONENT;
    } 
  } else if (typeof type === 'string') {
    fiberTag = HOST_COMPONENT;
  }

  fiber = createFiber(fiberTag, pendingProps, key);
  fiber.elementType = type;
  fiber.type = resolvedType;

  return fiber;
}

function createFiberNode (tag, pendingProps, key) {
  return {
    tag,
    key,
    type: null,
    elementType: null,
    stateNode: null,

    return: null,
    child: null,
    sibling: null,
    index: 0,
    
    ref: null,
    pendingProps,
    memoizedProps: null,
    memoizedState: null,
    updateQueue: null,

    effectTag: NO_EFFECT,

    alternate: null
  }
}

function createFiber (tag, pendingProps, key) {
  return createFiberNode(tag, pendingProps, key);
}


