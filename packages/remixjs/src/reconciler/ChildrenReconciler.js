import { isNull, isString, isNumber, isArray, isNullOrUndefined, isFunction } from '../shared/is';
import { REACT_FRAGMENT_TYPE, REACT_ELEMENT_TYPE, REACT_PORTAL_TYPE } from '../shared/elementTypes';
import { FRAGMENT, HOST_TEXT, HOST_PORTAL } from '../shared/workTags';
import { PLACEMENT, DELETION } from '../shared/effectTags';
import { 
  createWorkInProgress, 
  createFiberFromFragment, 
  createFiberFromText, 
  createFiberFromElement 
} from './FiberNode';


export default function ChildrenReconciler (
  shouldTrackSideEffects
) {

  function reconcileSingleTextElement (
    returnFiber, 
    currentFirstChild,
    textContent
  ) {
    if (!isNullOrUndefined(currentFirstChild) && currentFirstChild.tag === HOST_TEXT) {
      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
      const existing = useFiber(currentFirstChild, textContent);
      existing.return = returnFiber;
      return existing;
    }
    
    deleteRemainingChildren(returnFiber, currentFirstChild);
    
    const fiber = createFiberFromText(textContent);

    fiber.return = returnFiber;
    return fiber;
  }

  function reconcileSingleElement (
    returnFiber,
    currentFirstChild,
    newChild
  ) {
    const { key, type } = newChild;
    let child = currentFirstChild;

    while (!isNullOrUndefined(child)) {
      if (child.key === key) {
        if (
          child.tag === FRAGMENT ? 
            element.type === REACT_FRAGMENT_TYPE : 
            child.elementType === newChild.type
        ) {
          deleteRemainingChildren(returnFiber, child.sibling);
          const existing = useFiber(
            child, newChild.type === REACT_FRAGMENT_TYPE ? 
              newChild.props.children : 
              newChild.props
          );
          existing.ref = coerceRef(returnFiber, child, newChild);
          existing.return = returnFiber;
          
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }

      child = child.sibling;
    }

    if (type === REACT_FRAGMENT_TYPE) {
      const fiber = createFiberFromFragment(newChild.props.children, element.key);
      fiber.return = returnFiber;
      return fiber;
    } else {
      const fiber = createFiberFromElement(newChild);
      
      fiber.return = returnFiber;
      return fiber;
    }
  }

  function placeSingleChild (fiber) {
    if (shouldTrackSideEffects && isNullOrUndefined(fiber.alternate)) {
      fiber.effectTag |= PLACEMENT;
    }

    return fiber;
  }

  function deleteRemainingChildren (
    returnFiber,
    currentFirstChild
  ) {
    if (shouldTrackSideEffects) {
      let childToDelete = currentFirstChild;
      while (!isNullOrUndefined(childToDelete)) {
        deleteChild(returnFiber, childToDelete);
        childToDelete = childToDelete.sibling;
      }
      return null;
    }
  }

  function mapRemainingChildren(returnFiber, currentFirstChild) {
    const existingChildren = new Map();
    const existingChild = currentFirstChild;

    while (!isNullOrUndefined(existingChild)) {
      if (isNullOrUndefined(existingChild.key)) {
        existingChildren.set(existingChild.key, existingChild);
      } else {
        existingChildren.set(existingChild.index, existingChild);
      }

      existingChild = existingChild.sibling;
    }

    return existingChildren;
  }

  function coerceRef(
    returnFiber, 
    current, 
    element
  ) {
    var mixedRef = element.ref;

    if (
      !isNullOrUndefined(mixedRef) && 
      !isFunction(mixedRef) && 
      !isObject(mixedRef)
    ) {
      if (element._owner) {
        const owner = element._owner;
        let instance;
        if (owner) {
          const ownerFiber = owner;

          instance = ownerFiber.stateNode;
        }
        
        const stringRef = String(mixedRef);

        if (
          !isNullOrUndefined(current) && 
          !isNullOrUndefined(current.ref) && 
          isFunction(current.ref) && 
          current.ref._stringRef === stringRef
        ) {
          return current.ref;
        }

        const ref = function (value) {
          let refs = inst.refs;
          if (refs === EMPTY_REFS) {
            refs = inst.refs = {};
          }

          if (isNullOrUndefined(value)) {
            delete refs[stringRef];
          } else {
            refs[stringRef] = value;
          }
        };

        ref._stringRef = stringRef;
        return ref;
      } else {
        // error
      }
    }

    return mixedRef;
  }

  function useFiber(fiber, pendingProps) {
    const clone = createWorkInProgress(fiber, pendingProps);
    
    clone.index = 0;
    clone.sibling = null;
    
    return clone;
  }

  function deleteChild (
    returnFiber,
    child
  ) {
    if (shouldTrackSideEffects) {
      let last = returnFiber.lastEffect;

      if (isNullOrUndefined(last)) {
        last.nextEffect = child;
        returnFiber.lastEffect = child;
      } else {
        returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
      }
      child.nextEffect = null;
      child.effectTag = DELETION;
    }
  }

  function createChild(
    returnFiber, 
    newChild
  ) {
    if (isString(newChild) || isNumber(newChild)) {
      const created = createFiberFromText(String(newChild));
      created.return = returnFiber;
      return created;
    }

    if (!isNullOrUndefined(newChild)) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE: {
          const created = createFiberFromElement(newChild);
          created.ref = coerceRef(returnFiber, null, newChild);
          created.return = returnFiber;
          return created;
        }

        case REACT_PORTAL_TYPE: {
          const created = createFiberFromPortal(newChild);
          created.return = returnFiber;
          return created;
        }
      }

      if (isArray(newChild)) {
        const created = createFiberFromFragment(newChild, null);
        created.return = returnFiber;
        return created;
      }
    }

    return null;
  }

  function placeChild(
    newFiber,
    lastPlacedIndex,
    index
  ) {
    newFiber.index = index;
    if (!shouldTrackSideEffects) {
      return lastPlacedIndex;
    }

    const current = newFiber.alternate;
    if (!isNullOrUndefined(current)) {
      const oldIndex = current.index;

      if (oldIndex < lastPlacedIndex) {
        newFiber.effectTag = PLACEMENT;
        return lastPlacedIndex;
      } else {
        return oldIndex;
      }
    } else {
      newFiber.effectTag = PLACEMENT;
      return lastPlacedIndex;
    }
  }

  function updateFromMap(
    existingChildren, 
    returnFiber, 
    index, 
    newChild
  ) {
    if (isString(newChild) || isNumber(newChild)) {
      const matchedFiber = existingChildren.get(index) || null;

      return updateTextNode(returnFiber, matchedFiber, String(newChild));
    }

    if (!isNullOrUndefined(newChild)) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE: {
          const key = isNullOrUndefined(newChild.key) ? index : newChild.key;
          const matchedFiber = existingChildren.get(key) || null;

          if (newChild.type === REACT_FRAGMENT_TYPE) {
            return updateFragment(returnFiber, matchedFiber, newChild.props.children, newChild.key);
          } else {
            return updateElement(returnFiber, matchedFiber, newChild);
          }
        }

        case REACT_PORTAL_TYPE: {
          const key = isNullOrUndefined(newChild.key) ? index : newChild.key;
          const matchedFiber = existingChildren.get(key) || null;

          return updatePortal(returnFiber, matchedFiber, newChild);
        }
      }

      if (isArray(newChild)) {
        const matchedFiber = existingChildren.get(index) || null;
        return updateFragment(returnFiber, matchedFiber, newChild, null);
      }
    }

    return null;
  }

  function updateTextNode (
    returnFiber,
    current,
    textContent
  ) {
    if (isNullOrUndefined(current)|| current.tag !== HOST_TEXT) {
      const created = createFiberFromText(textContent);
      created.return = returnFiber;
      return created;
    } else {
      const existing = useFiber(current, textContent);
      existing.return = returnFiber;
      return existing;
    }
  }

  function updateFragment (
    returnFiber,
    current,
    fragment
  ) {
    if (isNullOrUndefined(current) || current.tag !== FRAGMENT) {
      const created = createFiberFromFragment(fragment, key);
      created.return = returnFiber;
      return created;
    } else {
      const existing = useFiber(current, fragment);
      existing.return = returnFiber;
      return existing;
    }
    
  }

  function updateElement (
    returnFiber,
    current,
    element
  ) {
    if (
      !isNullOrUndefined(current) && 
      current.elementType === element.type 
    ) {
      const existing = useFiber(current, element.props);
      existing.ref = coerceRef(returnFiber, current, element);
      existing.return = returnFiber;

      return existing;
    } else {
      const created = createFiberFromElement(element);
      created.ref = coerceRef(returnFiber, current, element);
      created.return = returnFiber;
      return created;
    }
  }

  function updatePortal (
    returnFiber,
    current,
    portal
  ) {
    if (
      isNullOrUndefined(current) ||
      current.tag !== HOST_PORTAL ||
      current.stateNode.containerInfo !==portal.containerInfo
    ) {
      const created = createFiberFromPortal(portal);
      created.return = returnFiber;
      return created;
    } else {
      var existing = useFiber(current$$1, portal.children || [], expirationTime);
      existing.return = returnFiber;
      return existing;
    }
  }

  function updateSlot (
    returnFiber,
    oldFiber,
    newChild
  ) {
    const key = isNullOrUndefined(oldFiber) ? null : oldFiber.key;

    if (isString(newChild) || isNumber(newChild)) {
      if (!isNullOrUndefined(key)) {
        return null;
      }

      return updateTextNode(returnFiber, oldFiber, String(newChild));
    }

    if (!isNullOrUndefined(newChild)) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE: {
          if (newChild.key === key) {
            if (newChild.type === REACT_FRAGMENT_TYPE) {
              return updateFragment(returnFiber, oldFiber, newChild.props.children, key);
            }
            return updateElement(returnFiber, oldFiber, newChild);
          } else {
            return null;
          }
        }
          
        case REACT_PORTAL_TYPE: {
          if (newChild.key === key) {
            return updatePortal(returnFiber, oldFiber, newChild, expirationTime);
          } else {
            return null;
          }
        }
      }
    }

    return null;
  }

  function reconcileChildrenArray (
    returnFiber, 
    currentFirstChild, 
    newChildren
  ) {
    let resultingFirstChild = null;
    let previousNewFiber = null;
    let oldFiber = currentFirstChild;
    let nextOldFiber = null;

    let lastPlacedIndex = 0;
    let index = 0;

    const length = newChildren.length;

    for (;!isNullOrUndefined(oldFiber) && index < length; index++) {
      if (oldFiber.index > index) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }

      const child = newChildren[index];

      let newFiber = updateSlot(returnFiber, oldFiber, child);
      if (isNullOrUndefined(newFiber)) {
        if (isNullOrUndefined(oldFiber)) {
          oldFiber = nextOldFiber;
        }

        break;
      }

      if (shouldTrackSideEffects) {
        if (oldFiber && isNullOrUndefined(newFiber.alternate)) {
          deleteChild(returnFiber, oldFiber);
        }
      }

      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, index);

      if (isNullOrUndefined(previousNewFiber)) {
        resultingFirstChild = newFiber;
      } else {
        previousNewFiber.sibling = newFiber;
      }

      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (index === newChildren.length) {
      deleteRemainingChildren(returnFiber, oldFiber);
    }

    if (isNullOrUndefined(oldFiber)) {
      for (;index < length; index++) {
        const newFiber = createChild(returnFiber, newChildren[index]);
        if (isNullOrUndefined(newFiber)) {
          continue;
        }

        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, index);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;
        }

        previousNewFiber = newFiber;
      }

      return resultingFirstChild;
    }

    const existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    for (;index < length; index++) {
      const newFiber = updateFromMap(existingChildren, returnFiber, index, newChildren[index]);

      if (!isNullOrUndefined(newFiber)) {
        if (shouldTrackSideEffects) {
          if (!isNullOrUndefined(newFiber.alternate)) {
            existingChildren.delete(isNullOrUndefined(newFiber.key) ? index : newFiber.key);
          }
        }

        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, index);
        if (isNullOrUndefined(previousNewFiber)) {
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
      }
    }

    if (shouldTrackSideEffects) {
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    return resultingFirstChild;
  }


  return function reconcileChildren (
    returnFiber,
    currentFirstChild,
    newChild
  ) {
    if (!isNullOrUndefined(newChild)) {
      if (newChild.$$typeof) {
        return placeSingleChild(
          reconcileSingleElement(returnFiber, currentFirstChild, newChild)
        );
      }
    }

    if (isString(newChild) || isNumber(newChild)) {
      return placeSingleChild(
        reconcileSingleTextElement(returnFiber, currentFirstChild, String(newChild))
      );
    }

    if (isArray(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild);
    }

    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }
}