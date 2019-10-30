import { isNullOrUndefined, isNumber, isString } from '../../shared/is';
import { INPUT, TEXTAREA } from '../../shared/elementTags';
import { STYLE, CHILDREN, DANGEROUSLY_SET_INNER_HTML } from '../../shared';
import { UPDATE } from '../../shared/effectTags';
import registrationNameModules from '../../event/registrationNameModules';

export default function updateHostInstance (
  current,
  workInProgress,
  type,
  nextProps,
  rootContainerInstance 
) {
  const props = current.memoizedProps;
  
  if (props !== nextProps) {
    const instance = workInProgress.stateNode;
    
    const updatePayload = prepareUpdate(instance, type, props, nextProps, rootContainerInstance, null);
    workInProgress.updateQueue = updatePayload;
    workInProgress.effectTag |= UPDATE;
  }
}

function prepareUpdate (
  element, 
  type, 
  props, 
  nextProps, 
  rootContainerInstance, 
  hostContext
) {
  return diffProperties(element, type, props, nextProps, rootContainerInstance);
}

function diffProperties(
  elements, 
  tag, 
  lastRawProps, 
  nextRawProps, 
  rootContainerInstance
) {
  let updatePayload = null;
  let lastProps = lastRawProps;
  let nextProps = nextRawProps;

  let propKey;
  let styleName;
  let styleUpdates = null;

  // 删除 props
  for (propKey in lastProps) {
    if (
      nextProps.hasOwnProperty(propKey) || 
      !lastProps.hasOwnProperty(propKey) || 
      isNullOrUndefined(lastProps[propKey])
    ) {
      continue;
    }

    if (propKey === STYLE) {
      const lastStyle = lastProps[propKey];

      for (styleName in lastStyle) {
        if (lastStyle.hasOwnProperty(styleName)) {
          if (!styleUpdates) {
            styleUpdates = {};
          }

          styleUpdates[styleName] = '';
        }
      }
    } else {
      (updatePayload = updatePayload || []).push(propKey, null);
    }
  }

  // 对比 props
  for (propKey in nextProps) {
    const nextProp = nextProps[propKey];
    const lastProp = !isNullOrUndefined(lastProps) ? 
      lastProps[propKey] : 
      undefined;

    if (
      !nextProps.hasOwnProperty(propKey) || 
      nextProp === lastProp || 
      isNullOrUndefined(nextProp) && 
      isNullOrUndefined(lastProp)
    ) {
      continue;
    }

    if (propKey === STYLE) {
      if (nextProp) {
        Object.freeze(nextProp);
      }

      if (lastProp) {
        for (styleName in lastProp) {
          if (
            lastProp.hasOwnProperty(styleName) && 
            (!nextProp || !nextProp.hasOwnProperty(styleName))
          ) {
            if (!styleUpdates) {
              styleUpdates = {};
            }
            styleUpdates[styleName] = '';
          }
        }
        
        for (styleName in nextProp) {
          if (
            nextProp.hasOwnProperty(styleName) && 
            lastProp[styleName] !== nextProp[styleName]
          ) {
            if (!styleUpdates) {
              styleUpdates = {};
            }
            styleUpdates[styleName] = nextProp[styleName];
          }
        }
      } else {
        if (!styleUpdates) {
          if (!updatePayload) {
            updatePayload = [];
          }
          updatePayload.push(propKey, styleUpdates);
        }
        styleUpdates = nextProp;
      }
    } else if (propKey === CHILDREN) {
      if (
        lastProp !== nextProp && 
        (isString(nextProp) || isNumber(nextProp))
      ) {
        (updatePayload = updatePayload || []).push(propKey, String(nextProp));
      }
    } else {
      (updatePayload = updatePayload || []).push(propKey, nextProp);
    }
  }
  
  if (styleUpdates) {
    (updatePayload = updatePayload || []).push(STYLE, styleUpdates);
  }

  return updatePayload;
}