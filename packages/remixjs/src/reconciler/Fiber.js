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

