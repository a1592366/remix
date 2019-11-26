import { DELETION, PLACEMENT } from '../shared/effectTags';
import { HOST_TEXT, FRAGMENT } from '../shared/workTags';
import { REACT_ELEMENT_TYPE } from '../shared/elementTypes';
import { isArray } from '../shared/is';
import { 
  createWorkInProgress, 
  createFiberFromText, 
  createFiberFromElement,
  createFiberFromFragment
} from './Fiber';

function deleteChild (returnFiber, childToDelete, shouldTrackSideEffects) {
  if (shouldTrackSideEffects) {
    const lastEffect = returnFiber.lastEffect;

    // 根据 lastEffect 判断是否存在 effect，否则新增
    if (last !== null) {
      lastEffect.next = childToDelete;
      returnFiber.lastEffect = childToDelete;
    } else {
      returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    }

    childToDelete.next = null;
    childToDelete.effectTag = DELETION;  
  }
}

function deleteRemainingChildren (returnFiber, currentFirstChild, shouldTrackSideEffects) {
  if (shouldTrackSideEffects) {
    let childToDelete = currentFirstChild;

    // 批量处理需要标记删除的 children
    while (childToDelete !== null) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }

    return null;
  } 

  return null;
}

function placeChild (newFiber, lastPlacedIndex, newIndex, shouldTrackSideEffects) {
  newFiber.index = newIndex;

  if (!shouldTrackSideEffects) {
    return lastPlacedIndex;
  }

  const current = newFiber.alternate;

  // 不是第一次渲染情况
  if (current !== null) {
    const oldIndex = current.index;

    // 判断元素位置，如果大于
    if (oldIndex < lastPlacedIndex) {
      // 则是移动元素操作
      newFiber.effectTag = PLACEMENT;
      return lastPlacedIndex;
    } else {
      return oldIndex;
    }
  } else {
    // 第一次渲染则是插入操作
    newFiber.effectTag = PLACEMENT;
    return lastPlacedIndex;
  }
}

function placeSingleChild(newFiber, shouldTrackSideEffects) {
  if (shouldTrackSideEffects && newFiber.alternate === null) {
    newFiber.effectTag = PLACEMENT;
  }

  return newFiber;
}

function useFiber(fiber, props) {
  const clone = createWorkInProgress(fiber, props);
  clone.index = 0;
  clone.sibling = null;
  return clone;
}

function createChild(returnFiber, newChild) {
  // 判断是否是纯文本
  if (typeof newChild === 'string' || typeof newChild === 'number') {
    const created = createFiberFromText('' + newChild);
    created.return = returnFiber;
    return created;
  }

  // 如果是对象
  if (typeof newChild === 'object' && newChild !== null) {
    // TODO 根据 $$typeof 构建 fiber
    if (newChild.$$typeof) {
      const created = createFiberFromElement(newChild);
      created.return = returnFiber;
      return created;
    }
  }

  // 如果是数组
  if (isArray(newChild)) {
    const created = createFiberFromElement(newChild, null);
    created.return = returnFiber;
    return created;
  }

  return null;
}

function updateTextNode(returnFiber, current, textContent) {
  // 不是首次渲染, 则创建 fiber，否则使用 useFiber 克隆
  if (current !== null && current.tag !== HOST_TEXT) {
    const created = createFiberFromText(textContent);
    created.return = returnFiber;
    return created;
  } else {
    const existing = useFiber(current, textContent);
    existing.return = returnFiber;
    return existing;
  }
}

function updateElement(returnFiber, current, element) {
  if (current !== null && current.elementType === element.type) {
    const existing = useFiber(current, element.props);
    existing.return = returnFiber;
    return existing;
  } else {
    const created = createFiberFromElement(element);
    created.return = returnFiber;
    return created;
  }
}

function updateFragment(returnFiber, current, fragment) {
  if (current === null || current.tag !== FRAGMENT) {
    const created = createFiberFromFragment(fragment, null);
    created.return = returnFiber;
    return created;
  } else {
    // Update
    const existing = useFiber(current, fragment);
    existing.return = returnFiber;
    return existing;
  }
}

function updateSlot(returnFiber, oldFiber, newChild) {
  const key = oldFiber !== null ? oldFiber.key : null;

  if (typeof newChild === 'string' || typeof newChild === 'number') {
    if (key !== null) {
      return null;
    }

    return updateTextNode(returnFiber, oldFiber, '' + newChild);
  } else if (typeof newChild === 'object' && newChild !== null) {
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE: {
        if (newChild.key === key) {
          return updateElement(returnFiber, oldFiber, newChild);
        } else {
          return null;
        }
      }
    }
  } else if (isArray(newChild)) {
    if (key !== null) {
        return null;
    }
    return updateFragment(returnFiber, oldFiber, newChild);
  }

  return null;
}

function mapRemainingChildren(returnFiber, currentFirstChild) {
  const existingChildren = new Map();
  let existingChild = currentFirstChild;
  while (existingChild !== null) {
    if (existingChild.key !== null) {
      existingChildren.set(existingChild.key, existingChild);
    } else {
      existingChildren.set(existingChild.index, existingChild);
    }

    existingChild = existingChild.sibling;
  }
  
  return existingChildren;
}

function reconcileChildrenArray(
  returnFiber, 
  currentFirstChild, 
  newChildren, 
  shouldTrackSideEffects
) {
  let resultingFirstChild = null;
  let previousnewFiber = null;

  let oldFiber = currentFirstChild; // null
  let lastPlacedIndex = 0;
  let newIdx = 0;
  let nextOldFiber = null;

  for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
    if (oldFiber.index > newIdx) {
      nextOldFiber = oldFiber;
      oldFiber = null;
    } else {
      nextOldFiber = oldFiber.sibling;
    }
    const newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx]);
    if (newFiber === null) {
      // TODO: This breaks on empty slots like null children. That's
      // unfortunate because it triggers the slow path all the time. We need
      // a better way to communicate whether this was a miss or null,
      // boolean, undefined, etc.
      if (oldFiber === null) {
        oldFiber = nextOldFiber;
      }
      break;
    }
    lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects);

    if (previousnewFiber === null) {
      resultingFirstChild = newFiber;
    } else {
      previousnewFiber.sibling = newFiber;
    }
    previousnewFiber = newFiber;
    oldFiber = nextOldFiber;
  }

  if (newIdx === newChildren.length) {
    // We've reached the end of the new children. We can delete the rest.
    deleteRemainingChildren(returnFiber, oldFiber);
    return resultingFirstChild;
  }

  if (oldFiber === null) {
    // If we don't have any more existing children we can choose a fast path
    // since the rest will all be insertions.
    for (; newIdx < newChildren.length; newIdx++) {
      const newFiber = createChild(
        returnFiber,
        newChildren[newIdx],
      );
      // if newFiber === null continue
      if (!newFiber) {
        continue;
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      // we will set relation ship here
      if (previousnewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        previousnewFiber.sibling = newFiber;
      }
      previousnewFiber = newFiber
    }
    return resultingFirstChild;
  }
  // Add all children to a key map for quick lookups.
  const existingChildren = mapRemainingChildren(returnFiber, oldFiber);

  // Keep scanning and use the map to restore deleted items as moves.
  return resultingFirstChild;

}

function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent) {
  // 如果纯文本
  if (currentFirstChild !== null && currentFirstChild.tag === HOST_TEXT) {
    deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
    const existing = useFiber(currentFirstChild, textContent);
    existing.return = returnFiber;
    return existing;
  }

  deleteRemainingChildren(returnFiber, currentFirstChild);
  const created = createFiberFromText(textContent);
  created.return = returnFiber;
  return created;
}

function reconcileSingleElement(returnFiber, currentFirstChild, element, shouldTrackSideEffects) {
  let key = element.key;
  let child = currentFirstChild;
  while (child !== null) {
    if (child.key === key) {
      if (child.elementType === element.type) {
        // if we had a child we use exactly it
        deleteRemainingChildren(returnFiber, child.sibling, shouldTrackSideEffects);
        let existing = useFiber(child, element.props);
        existing.return = returnFiber;
        return existing
      } else {
        deleteRemainingChildren(returnFiber, child);
        break;
      }
    }

    child = child.sibling;
  }

  const created = createFiberFromElement(element);
  created.return = returnFiber;
  return created;
}


export default function ChildrenReconciler (shouldTrackSideEffects) {
  return function reconcileChildren (returnFiber, currentFirstChild, newChild) {
    const isObject = typeof newChild === 'object' && newChild !== null;

    // 如果是 react element
    if (isObject) {
      if (newChild.$$typeof) {
        return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, shouldTrackSideEffects), shouldTrackSideEffects);
      }
    // 如果是文本
    }

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild), shouldTrackSideEffects);
    // 如果是数组
    } else if (isArray(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild);
    }

    return deleteRemainingChildren(returnFiber, currentFirstChild, shouldTrackSideEffects);
  }
}

