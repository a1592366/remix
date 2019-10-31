import { isNull } from '../shared/is';
import { HOST_ROOT } from '../shared/workTags';


function createWorkInProgress () {
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

    effectTag: NO_EFFECT,

    alternate: null
  }
}

function createFiber (tag, pendingProps, key) {
  return createFiberNode(tag, pendingProps, key);
}

