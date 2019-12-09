import { PERFORMED_WORK, PLACEMENT, UPDATE, DELETION, PLACEMENT_AND_UPDATE, CALLBACK, REF, PASSIVE, CONTENT_RESET } from '../shared/effectTags';
import { CLASS_COMPONENT, HOST_ROOT, HOST_TEXT, HOST_COMPONENT, HOST_PORTAL, FUNCTION_COMPONENT } from '../shared/workTags';
import { resolveDefaultProps, INTERNAL_EVENT_HANDLERS_KEY } from '../shared';
import { 
  resetTextContext,
  insertBefore,
  insertInContainerBefore,
  appendChild,
  appendChildToContainer,
  updateProperties
} from '../renderer/config';

let nextEffect;

export let isWorking = false;
export let isCommiting = false;

export function commitRoot (
  root,
) {
  isWorking = true;
  isCommiting = true;

  const finishedWork = root.finishedWork;
  if (finishedWork) {
    root.finishedWork = null;

    let firstEffect;
    // 如果有有 effect
    if (finishedWork.effectTag > PERFORMED_WORK) {
      // 如果有 effect
      if (finishedWork.lastEffect !== null) {
        finishedWork.lastEffect.nextEffect = finishedWork;
        firstEffect = finishedWork.firstEffect;
      } else {
        firstEffect = finishedWork;
      }
    } else {
      firstEffect = finishedWork.firstEffect;
    }

    // 这里执行三大循环
    if (firstEffect !== null) {
      // commitBeforeMutationEffects

      nextEffect = firstEffect;
      do {

        nextEffect = nextEffect.nextEffect;
      } while (nextEffect !== null);

      nextEffect = firstEffect;

      do {
        commitMutationEffects(root, finishedWork);

        // nextEffect = nextEffect.nextEffect;
      } while (nextEffect !== null);

      root.current = finishedWork;
      nextEffect = firstEffect;

      do {
        commitLayoutEffects(root);

        // nextEffect = nextEffect.nextEffect;
      } while (nextEffect !== null);

      nextEffect = firstEffect;

      while (nextEffect !== null) {
        const nextNextEffect = nextEffect.nextEffect;
        nextEffect.nextEffect = null;
        nextEffect = nextNextEffect;
      }

      isCommiting = false;
      isWorking = false;
    }
  }
}

function commitMutationEffects (root, finishedWork) {
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag;

    if (effectTag & CONTENT_RESET) {
      
    }

    if (effectTag & REF) {

    }

    // 插入 | 更新 | 删除
    let primaryEffectTag = effectTag & (PLACEMENT | UPDATE | DELETION);
    switch (primaryEffectTag) {
      case PLACEMENT: {
        commitPlacement(nextEffect);
        
        // 重置 effectTag
        nextEffect.effectTag &= ~PLACEMENT;
        break;
      }

      case PLACEMENT_AND_UPDATE: {
        // PLACEMENT
        commitPlacement(nextEffect);
        nextEffect.effectTag &= ~PLACEMENT;

        // UPDATE
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      };

      case UPDATE: {
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }

      case DELETION: {
        commitDeletion(nextEffect);
        break;
      }

      default:
        break;
    }

    nextEffect = nextEffect.nextEffect;
  }
}

function commitLayoutEffects(root) {
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag;

    // UPDATE | CALLBACK 
    // thi.setState({}, () => {})
    // render(<App />, container, () => {})
    // componentDidUpdate
    if (effectTag & (UPDATE | CALLBACK)) {
      const current = nextEffect.alternate;
      commitLifeCycles(root, current, nextEffect);
    }

    // <div ref={() => {}}></div>
    if (effectTag & REF) {
      commitAttachRef(nextEffect);
    }

    // if (effectTag & PASSIVE) {
    //   rootWithPendingPassiveEffects = finishedRoot;
    // }

    nextEffect = nextEffect.nextEffect;

  }
}

function commitLifeCycles(finishedRoot, current, finishedWork) {
  switch (finishedWork.tag) {
    case CLASS_COMPONENT: {
      const instance = finishedWork.stateNode;

      // 首次渲染
      if (current === null) {
        if (typeof instance.componentDidMount === 'function') {
          instance.componentDidMount();
        }
      } else {
        const prevProps = finishedWork.elementType === finishedWork.type ? 
          current.memoizedProps : 
          resolveDefaultProps(finishedWork.type, current.memoizedProps);
        
        const prevState = current.memoizedState;

        if (typeof instance.componentDidUpdate === 'function') {
          instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
        }
      }

      const updateQueue = finishedWork.updateQueue;
      if (updateQueue !== null) {
        commitUpdateQueue(finishedWork, updateQueue, instance); 
      }

      break;
    }
    case HOST_ROOT: {
        const updateQueue = finishedWork.updateQueue;
        if (updateQueue !== null) {
          let instance = null;
          if (finishedWork.child !== null) {
            switch (finishedWork.child.tag) {
              case HOST_COMPONENT:
                instance = getPublicInstance(finishedWork.child.stateNode);
                break;
              case CLASS_COMPONENT:
                instance = finishedWork.child.stateNode;
                break;
            }
          }

          commitUpdateQueue(finishedWork, updateQueue, instance);
        }
        break;
      }
    case HOST_COMPONENT: {
        const instance = finishedWork.stateNode;

        if (current === null && finishedWork.effectTag & UPDATE) {
          const type = finishedWork.type;
          const props = finishedWork.memoizedProps;
          commitMount(instance, type, props, finishedWork);
        }

        break;
    }
    
    default: {
      throw new Error(`This unit of work tag should not have side-effects. This error is likely caused by a bug in Remixjs. Please file an issue.`)
    }
  }
}

function commitUpdateQueue(finishedWork, finishedQueue, instance) {
  // 这里的 effect 是 updateQueue effectList，在 processUpdate 产生的副作用
  commitUpdateEffects(finishedQueue.firstEffect, instance);
  // 重置 updateQueue effect list
  finishedQueue.firstEffect = finishedQueue.lastEffect = null;
}

function commitUpdateEffects(effect, instance) {
  // 处理updateQueue effect
  while (effect !== null) {
    const callback = effect.callback;

    // setState , render 回调函数
    if (typeof callback === 'function') {
      effect.callback = null;
      callback.call(instance);
    }

    effect = effect.nextEffect;
  }
}

function commitPlacement (finishedWork) {
  const parentFiber = getHostParentFiber(finishedWork);
  const { tag, stateNode } = parentFiber;

  let parent;
  let isContainer;

  switch (tag) {
    case HOST_COMPONENT: {
      parent = stateNode;
      isContainer = false;
      break;
    }
    case HOST_ROOT: {
      parent = stateNode.containerInfo;
      isContainer = true;
      break;
    }

    case HOST_PORTAL: {
      parent = stateNode.containerInfo;
      isContainer = true;
      break;
    }
    default:
      console.log('Invalid host parent')
  }

  if (parentFiber.effectTag & CONTENT_RESET) {
    resetTextContent(parent);
    parentFiber.effectTag &= ~CONTENT_RESET;
  }

  const before = getHostSibling(finishedWork);
  let node = finishedWork;
  while (true) {
    const isHost = node.tag === HOST_COMPONENT || node.tag === HOST_TEXT;

    if (isHost) {
      const stateNode = isHost ? 
        node.stateNode : 
        node.stateNode.instance;

      if (before) {
        if (isContainer) {
          insertInContainerBefore(parent, stateNode, before);
        } else {
          insertBefore(parent, stateNode, before);
        }
      } else {
        if (isContainer) {
          appendChildToContainer(parent, stateNode);
        } else {
          appendChild(parent, stateNode);
        }
      }
    } else if (node.tag === HOST_PORTAL) {

    } else if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }

    if (node === finishedWork) {
      return;
    }

    while (node.sibling === null) {
      if (node.return === null || node.return === finishedWork) {
        return;
      }

      node = node.return;
    }

    node.sibling.return = node.return;
    node = node.sibling;
  }
}

function commitUpdate (instance, updateQueue, type, props, nextProps, finishedWork) {
  instance[INTERNAL_EVENT_HANDLERS_KEY] = nextProps;
  updateProperties(instance, updateQueue, type, props, nextProps);
}

function commitMount(domElement, type, newProps, internalInstanceHandle) {
  // 处理焦点问题
  if (shouldAutoFocusHostComponent(type, newProps)) {
    domElement.focus();
  }
}

// 处理ref
function commitAttachRef(finishedWork) {
  const ref = finishedWork.ref;
  if (ref !== null) {
    const instance = finishedWork.stateNode;
    let instanceToUse;
    switch (finishedWork.tag) {
      case HOST_COMPONENT:
        instanceToUse = getPublicInstance(instance);
        break;
      default:
        instanceToUse = instance;
    }

    if (typeof ref === 'function') {
      ref(instanceToUse);
    } else {
      ref.current = instanceToUse;
    }
  }
}

function commitUnmount(current) {

  switch (current.tag) {
    case FUNCTION_COMPONENT: {
        const updateQueue = current.updateQueue;
        if (updateQueue !== null) {
          const lastEffect = updateQueue.lastEffect;
          if (lastEffect !== null) {
            const firstEffect = lastEffect.next;

            runWithPriority(priorityLevel, function () {
              var effect = firstEffect;
              do {
                var destroy = effect.destroy;
                if (destroy !== undefined) {
                  safelyCallDestroy(current, destroy);
                }
                effect = effect.next;
              } while (effect !== firstEffect);
            });
          }
        }
        break;
      }
    case CLASS_COMPONENT:
      {
        // safelyDetachRef(current);
        var instance = current.stateNode;
        if (typeof instance.componentWillUnmount === 'function') {
          safelyCallComponentWillUnmount(current, instance);
        }
        return;
      }
    case HOST_COMPONENT:
      {
        if (enableFlareAPI) {
          var dependencies = current.dependencies;

          if (dependencies !== null) {
            var respondersMap = dependencies.responders;
            if (respondersMap !== null) {
              var responderInstances = Array.from(respondersMap.values());
              for (var i = 0, length = responderInstances.length; i < length; i++) {
                var responderInstance = responderInstances[i];
                unmountResponderInstance(responderInstance);
              }
              dependencies.responders = null;
            }
          }
        }
        safelyDetachRef(current);
        return;
      }
    case HOST_PORTAL:
      {
        // TODO: this is recursive.
        // We are also not using this parent because
        // the portal will get pushed immediately.
        if (supportsMutation) {
          unmountHostComponents(current, renderPriorityLevel);
        } else if (supportsPersistence) {
          emptyPortalContainer(current);
        }
        return;
      }
    case FUNCTION_COMPONENT:
      {
        if (enableFundamentalAPI) {
          var fundamentalInstance = current.stateNode;
          if (fundamentalInstance !== null) {
            unmountFundamentalComponent(fundamentalInstance);
            current.stateNode = null;
          }
        }
      }
  }
}

function commitNestedUnmounts(root) { 
  let node = root;
  while (true) {
    commitUnmount(node);
    if (node.child !== null && (
    !supportsMutation || node.tag !== HOST_PORTAL)) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === root) {
      return;
    }
    while (node.sibling === null) {
      if (node.return === null || node.return === root) {
        return;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}

function commitDeletion (current) {
  // if (supportsMutation) {
  //   unmountHostComponents(current, renderPriorityLevel);
  // } else {
  //   // Detach refs and call componentWillUnmount() on the whole subtree.
  //   commitNestedUnmounts(current, renderPriorityLevel);
  // }

  commitNestedUnmounts(current);

  detachFiber(current);
}

function detachFiber(current) {
  current.return = null;
  current.child = null;
  current.memoizedState = null;
  current.updateQueue = null;
  current.dependencies = null;

  const alternate = current.alternate;
  
  if (alternate !== null) {
    alternate.return = null;
    alternate.child = null;
    alternate.memoizedState = null;
    alternate.updateQueue = null;
  }
}

function commitWork (current, finishedWork) {
  const { tag } = finishedWork;

  switch (tag) {
    case FUNCTION_COMPONENT: {
      break;
    }

    case HOST_COMPONENT: {
      const instance = finishedWork.stateNode;
      if (instance !== null) {
        const nextProps = finishedWork.memoizedProps;
        const props = current !== null ? current.memoizedProps : nextProps;
        const type = finishedWork.type;

        const updateQueue = finishedWork.updateQueue;

        finishedWork.updateQueue = null;
        if (updateQueue !== null) {
          commitUpdate(instance, updateQueue, type, props, finishedWork, finishedWork);
        }
      }
      break;
    }

    case HOST_TEXT: {
      const instance = finishedWork.stateNode;
      const nextText = finishedWork.memoizedProps;
      const text = current === null ? current.memoizedProps : nextText;
      commitTextUpdate(instance, text, nextText);
      return;
    }
  }
}

function commitTextUpdate(textInstance, oldText, newText) {
  textInstance.nodeValue = newText;
}


function isHostParent(fiber) {
  return fiber.tag === HOST_COMPONENT || fiber.tag === HOST_ROOT || fiber.tag === HOST_PORTAL;
}

function shouldAutoFocusHostComponent(type, props) {
  switch (type) {
    case 'input':
    case 'textarea':
      return !!props.autoFocus;
  }
  
  return false;
}

function getHostSibling(fiber) {
  const node = fiber;
  siblings: while (true) {
    while (node.sibling === null) {
      if (node.return === null || isHostParent(node.return)) {
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

function getPublicInstance(instance) {
  return instance;
}

function getHostParentFiber(fiber) {
  let parent = fiber.return;

  while (parent !== null) {
    if (isHostParent(parent)) {
      return parent;
    }
    parent = parent.return;
  }
}