import { PERFORMED_WORK, PLACEMENT, UPDATE, DELETION, PLACEMENT_AND_UPDATE, CALLBACK, REF, PASSIVE } from '../shared/effectTags';
import { CLASS_COMPONENT, HOST_ROOT, HOST_COMPONENT } from '../shared/workTags';
import { resolveDefaultProps } from '../shared';

let nextEffect;

export let isWorking = false;
export let isCommiting = false;

export function commitRoot (
  root
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
        commitMutationEffects(root, current, finishedWork);

        nextEffect = nextEffect.nextEffect;
      } while (nextEffect !== null);

      nextEffect = firstEffect;

      do {
        commitLayoutEffects(root);

        nextEffect = nextEffect.nextEffect;
      } while (nextEffect !== null);

      nextEffect = null;

      isCommitting = false;
      isWorking = false;
    }
  }
}

function commitMutationEffects (root, current, finishedWork) {
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag;

    // 插入 | 更新 | 删除
    let primaryEffectTag = effectTag & (PLACEMENT | UPDATE | DELETION);
    switch (primaryEffectTag) {
      case PLACEMENT: {
        commitPlacement(nextEffect);
        
        // 重置 effectTag
        nextEffect.effectTag &= ~Placement;
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

    nextEffect = nextEffect.next;
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

    nextEffect = nextEffect.next;

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
        instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
      }

      const updateQueue = finishedWork.updateQueue;
      if (updateQueue !== null) {
        commitUpdateQueue(finishedWork, updateQueue, instance, committedExpirationTime); 
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

function commitPlacement (nextEffect) {

}


function shouldAutoFocusHostComponent(type, props) {
  switch (type) {
    case 'input':
    case 'textarea':
      return !!props.autoFocus;
  }
  
  return false;
}

function getPublicInstance(instance) {
  return instance;
}