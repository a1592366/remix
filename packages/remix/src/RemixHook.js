
import { scheduleWork } from './RemixScheduler';
import { markWorkInProgressReceivedUpdate } from './RemixScheduler';
import { SIDE_EFFECT, shallowEqual } from './RemixShared';

const is = Object.is;

let currentHook = null;
let nextCurrentHook = null;
let firstWorkInProgressHook = null;
let nextWorkInProgressHook = null;
let workInProgressHook = null;

let currentlyRenderingFiber = null;

const RemixHookDispatcher = {
  current: null
}

// ---- dispatcher ----
const HooksDispatcher = {
  useState (initialState) {
    const current = currentlyRenderingFiber.alternate;

    return current === null ?
      mountState(initialState) : 
      updateState(initialState);
  },

  useMemo (callback, deps) {
    const current = currentlyRenderingFiber.alternate;

    return current === null ?
      mountMemo(callback, deps) :
      updateMemo(callback, deps)
  },

  useCallback (callback, deps) {
    const current = currentlyRenderingFiber.alternate;

    return current === null ?
      mountCallback(callback, deps) :
      updateCallback(callback, deps);
  }
}

function basicStateReducer (
  state, 
  action
) {
  return typeof action === 'function' ? action(state) : action;
}

// ---- hook callback ----
function mountCallback () {

}

// ---- hook memo ----
function mountMemo (
  callback, 
  deps
) {
  const hook = mountWorkInProgressHook();
  const value = callback();

  deps = deps === undefined ? null : deps;

  hook.memoizedState = [value, deps];

  return value;
}

function updateMemo (
  callback, 
  deps
) {
  const hook = updateWorkInProgressHook();
  const prevState = hook.memoizedState;

  deps === undefined ? null : deps;
  if (prevState !== null) {
    if (deps !== null) {
      const prevDeps = prevState[1];
      if (shallowEqual(deps, prevDeps)) {
        return prevState[0];
      }
    }
  }

  const value = callback();
  hook.memoizedState = [value, deps];
  return value;
}

// ---- hook state ----
function mountState (
  initialState
) {
  const hook = mountWorkInProgressHook();

  if (typeof initialState === 'function') {
    initialState = initialState();
  }

  hook.memoizedState = hook.baseState = initialState;

  const queue = { last: null, dispatch: null };

  queue.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue
  );

  hook.queue = queue;

  return [hook.memoizedState, queue.dispatch];
}

function updateState (initialState) {
  return updateReducer(basicStateReducer, initialState);
}

function updateReducer(reducer) {
  const hook = updateWorkInProgressHook();
  const queue = hook.queue;
  
  const last = queue.last;
  const baseState = hook.baseState;

  const first = last !== null ? 
    last.next : null;
  
  if (first !== null) {
    let newState = baseState;
    let update = first;

    do {
      const { action } = update;

      newState = reducer(newState, action);
      update = update.next;
    } while (update !== null && update !== first);

    if (!is(newState, hook.memoizedState)) {
      markWorkInProgressReceivedUpdate();
    }

    hook.queue.last = null;
    hook.memoizedState = newState;
    hook.baseState = newState;
  }

  queue.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue
  );

  return [hook.memoizedState, queue.dispatch];
}

function updateWorkInProgressHook () {
  if (nextWorkInProgressHook !== null) {
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;

    currentHook = nextCurrentHook;
    nextCurrentHook = currentHook !== null ? 
      currentHook.next : null;
  } else {
    currentHook = nextCurrentHook;

    const hook = {
      memoizedState: currentHook.memoizedState,

      baseState: currentHook.baseState,
      queue: currentHook.queue,
      baseUpdate: currentHook.baseUpdate,

      next: null
    };

    if (workInProgressHook === null) {
      workInProgressHook = firstWorkInProgressHook = hook;
    } else {
      workInProgressHook = workInProgressHook.next = hook;
    }

    nextCurrentHook = currentHook.next;
  }

  return workInProgressHook;
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
    const last = queue.last;
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

export function useMemo (
  callback, 
  deps
) {
  const dispatcher = resolveDispatcher();

  return dispatcher.useMemo(callback, deps);
}

export function useCallback () {}

export function useState (
  initialState
) {
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

  let children = Component(nextProps);

  const renderedWork = currentlyRenderingFiber;

  renderedWork.memoizedState = firstWorkInProgressHook;
  renderedWork.effectTag |= SIDE_EFFECT;

  // 每次执行函数组件渲染，都需要重置全局变量
  currentHook = null;
  nextCurrentHook = null;
  firstWorkInProgressHook = null;
  workInProgressHook = null;
  nextWorkInProgressHook = null;

  return children;
}