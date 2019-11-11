import { createWorkInProgress } from './Fiber';
import ChildrenReconciler from './ChildrenReconciler';

export const reconcileChildFibers = new ChildrenReconciler(true);
export const mountChildFibers = new ChildrenReconciler(false);

export function cloneChildFibers (current, workInProgress) {
  if (workInProgress.child) {
    // 首选先之间对 child workInProgress 创新新的对象，然后在对 slibing 创建
    // 为 workInProgress 创建新的child workInProgress
    let child = workInProgress.child;
    let newChild = createWorkInProgress(child, child.penddingProps);

    // 设置 workInProgress 之间关系
    workInProgress.child = newChild;
    newChild.return = workInProgress;

    while (child.sibling !== null) {
      child = child.sibling;
      newChild = newChild.sibling = createWorkInProgress(
        child,
        child.penddingProps
      );

      newChild.return = workInProgress;
    }

    newChild.sibling = null;
  }
}

export function reconcileChildren (current, workInProgress, nextChildren) {
  if (current === null) {
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren);
  } else {
    workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren);
  }
}