export const [ STYLE, CHILDREN ] = [ 'style', 'children' ];

export default function diffProperties(
  domElement,
  tag,
  lastRawProps,
  nextRawProps,
  rootContainerElement
) {
  let updatePayload = null;
  let styleUpdates = null;
  let lastProps = lastRawProps;
  let nextProps = nextRawProps;
  let propKey;

  // 删去 props 更新
  for (propKey in lastProps) {
    if (
      !nextProps.hasOwnProperty(propKey) ||
      lastProps.hasOwnProperty(propKey) ||
      lastProps[propKey] === null
    ) {

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
        // 设置 prop 为 null
        (updatePayload = updatePayload || []).push(propKey, null);
      }
    }
  }

  // 增加 props 更新
  for (propKey in nextProps) {
    const nextProp = nextProps[propKey];
    const lastProp = lastProps !== null ? lastProps[propKey] : undefined;

    if (
      nextProps.hasOwnProperty(propKey) ||
      nextProp !== lastProp ||
      (nextProp !== null && lastProp !== null)
    ) {
      if (propKey === STYLE) {
        if (lastProp) {
          for (styleName in lastProp) {
            if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
              if (!styleUpdates) {
                styleUpdates = {};
              }
              styleUpdates[styleName] = '';
            }
          }

          for (styleName in nextProp) {
            if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
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
        // 文本
        if (
          lastProp !== nextProp && 
          (typeof nextProp === 'string' || typeof nextProp === 'number')
        ) {
          (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
        }

      } else if (
        // onClick onTap 情况
        propKey.length > 2 &&
        (propKey[0] === 'o' || propKey[0] === 'O') &&  (propKey[1] === 'n' || propKey[1] === 'N')
      ) {
        // todo 监听到root节点上
        // ensureListeningTo(domElement, propKey, nextProp);
        (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
      } else {
        (updatePayload = updatePayload || []).push(propKey, nextProp);
      }
    }
  }

  return updatePayload;
}