
import { scheduleWork } from './RemixScheduler';
import { SIDE_EFFECT } from './RemixShared';

let currentHook = null;
let nextCurrentHook = null;
let firstWorkInProgressHook = null;
let nextWorkInProgressHook = null;
let workInProgressHook = null;
let componentUpdateQueue = null;
let didScheduleRenderPhaseUpdate = false;
let currentlyRenderingFiber = null;

const RemixHookDispatcher = {
  current: null
}

// ---- dispatcher ----
const HooksDispatcher = {
  useState (initialState) {
    const { alternate: current } = currentlyRenderingFiber;
    let hook;

    if (current === null) {
      hook = mountWorkInProgressHook();

      if (typeof initialState === 'function') {
        initialState = initialState();
      }

      hook.memoizedState = hook.baseState = initialState;

      const queue = hook.queue = {
        last: null,
        dispatch: null,
        lastRenderedState: initialState
      }

      queue.dispatch = dispatchAction.bind(
        null,
        currentlyRenderingFiber,
        queue
      );
    } else {
      debugger;
    }

    return [hook.memoizedState, hook.queue.dispatch]
  }
}

function mountWorkInProgressHook () {
  const hook = {
    memoizedState: null,
    baseState: null,
    queue: null,
    next: null
  };

  if (workInProgressHook === null) {
    firstWorkInProgressHook = workInProgressHook = hook;
  } else {
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}

function dispatchAction (fiber, queue, action) {
  const update = {
    next: null,
    action
  }

  if (queue.last === null) {
    // 不存在 update，直接引用自身    
    update.next = update;
  } else {
    // 总是插在第一个 update 
    const first = last.next;
    if (first !== null) {
      // 在最新的update对象后面插入新的update对象
      update.next = first;
    }

    last.next = update;
  }

  queue.last = update;

  scheduleWork(fiber);
} 

function resolveDispatcher () {
  return RemixHookDispatcher.current;
}


// ---- exports ----
export function useReducer () {}

export function useMemo () {}

export function useCallback () {}

export function useState (initialState) {
  const dispatcher = resolveDispatcher();

  return dispatcher.useState(initialState);
}

export function renderWithHooks (
  current,
  workInProgress,
  Component,
  nextProps
) {
  RemixHookDispatcher.current = HooksDispatcher;
  currentlyRenderingFiber = workInProgress;

  // 非首次渲染，从 workInProgress memoizedState 取 hook
  nextCurrentHook =
    current !== null ? workInProgress.memoizedState : null

  nextWorkInProgressHook = firstWorkInProgressHook;

  // 每次执行函数组件渲染，都需要重置全局变量
  currentHook = null;
  workInProgressHook = null;
  componentUpdateQueue = null;

  let children = Component(nextProps);

  const renderedWork = currentlyRenderingFiber;

  renderedWork.memoizedState = firstWorkInProgressHook;
  renderedWork.updateQueue = componentUpdateQueue;
  renderedWork.effectTag |= SIDE_EFFECT;

  return children;
}
