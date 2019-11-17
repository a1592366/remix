import { request } from 'requestidlecallback';
import { HOST_ROOT, HOST_COMPONENT, HOST_TEXT, FUNCTION_COMPONENT, CLASS_COMPONENT, INDETERMINATE_COMPONENT } from '../shared/workTags';
import { EXPIRE_TIME, EMPTY_REFS, EMPTY_CONTEXT } from '../shared';
import { PERFORMED, PLACEMENT, UPDATE, PERFORMED_WORK, REF, SNAPSHOT, INCOMPLETE, NO_EFFECT, CONTENT_RESET } from '../shared/effectTags';
import { NO_WORK, WORKING } from '../shared/statusTags';
import { resolveDefaultProps, shallowEqual } from '../shared';
import { createWorkInProgress } from '../reconciler/Fiber';
import { completeUnitOfWork, completeRoot } from './completeWork';
import { 
  reconcileChildren, 
  cloneChildFibers, 
  reconcileChildFibers 
} from '../reconciler';
import { 
  createUpdate, 
  enqueueUpdate, 
  processUpdateQueue, 
  resetHasForceUpdateBeforeProcessing, 
  checkHasForceUpdateAfterProcessing
} from './updateQueue';
import classComponentUpdater from './classComponentUpdater';
import ReactCurrentOwner from '../react/ReactCurrentOwner';
import { SYNC } from '../shared/renderTags';



let nextUnitOfWork = null;
let workInProgress = null;
let disableLegacyContext = true;

let currentlyRenderingFiber = null;
let currentHook = null;
let nextCurrentHook = null;
let firstWorkInProgressHook = null;
let workInProgressHook = null;
let nextWorkInProgressHook = null;
let componentUpdateQueue = null;
let sideEffectTag = 0;
let ReactCurrentDispatcher = {
  current: null
};
let ContextOnlyDispatcher = null;

export function requestWork (root, isSync) {
  if (isSync) {
    performWorkSync(root);
  } else {
    request((deadline) => performWork(deadline, root));
  }
}

function performWorkSync (root) {
  workLoopSync(root);

  if (nextUnitOfWork) {
    requestWork(root, SYNC);
  }

  if (nextUnitOfWork === null) {
    const finishedWork = root.current.alternate; // workInProgress
    root.finishedWork = finishedWork;
    if (finishedWork) {
      completeRoot(root, finishedWork)
    }
  }
}

function performWork (deadline, root) {
  workLoop(deadline, root);

  if (nextUnitOfWork) {
    requestWork(root);
  }

  if (nextUnitOfWork === null) {
    const finishedWork = root.current.alternate; // workInProgress
    root.finishedWork = finishedWork;
    if (finishedWork) {
      completeRoot(root, finishedWork)
    }
  }
}

function workLoopSync(root) {
  if (nextUnitOfWork === null) {
    nextUnitOfWork = createWorkInProgress(root.current, null);
  }

  // 如果还有工作，有空档时间
  while (
    nextUnitOfWork !== null
  ) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
}

function workLoop(deadline, root) {
  if (nextUnitOfWork === null) {
    nextUnitOfWork = createWorkInProgress(root.current, null);
  }

  // 如果还有工作，有空档时间
  while (
    nextUnitOfWork !== null &&  
    deadline.timeRemaining() > EXPIRE_TIME
  ) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
}

function performUnitOfWork (nextUnitOfWork) {
  const current = nextUnitOfWork.alternate;
  let next = beginWork(current, nextUnitOfWork);

  nextUnitOfWork.memoizedProps = nextUnitOfWork.pendingProps;
  
  if (next === null) {
    next = completeUnitOfWork(nextUnitOfWork);
  }

  return next;
}

function beginWork (current, workInProgress) {
  // 如果不是第一次渲染
  if (current !== null) {
    // 当前 props
    const props = current.memoizedProps;
    // 即将更新 props
    const nextProps = workInProgress.pendingProps;

    // 如果 props 是同一个引用，则无须再次调用构造，直接更新子元素即可
    if (props === nextProps) {
      if (workInProgress.statusTag === NO_WORK) {
        cloneChildFibers(current, workInProgress);
        return workInProgress.child;
      }
    }
  }
  
  workInProgress.statusTag = NO_WORK;

  switch (workInProgress.tag) {
    case INDETERMINATE_COMPONENT: {
      return mountIndeterminateComponent(current, workInProgress)
    }

    case HOST_ROOT: {
      return updateHostRoot(current, workInProgress);
    }

    case HOST_COMPONENT: {
      return updateHostComponent(current, workInProgress);
    }

    case HOST_TEXT: {
      return updateHostText(current, workInProgress);
    }

    case CLASS_COMPONENT: {
      return updateClassComponent(current, workInProgress);
    }

    case FUNCTION_COMPONENT: {
      return updateFunctionComponent(current, workInProgress);
    }
  }
}

function updateHostComponent (current, workInProgress) {
  const type = workInProgress.type;
  const nextProps = workInProgress.pendingProps;
  const prevProps = current !== null ? current.memoizedProps : null;

  const isDirectTextChild = typeof nextProps.children === 'string' || typeof nextProps.children === 'number';
  let nextChildren = nextProps.children;

  if (isDirectTextChild) {
    nextChildren = null;
  } else if (
    prevProps !== null && 
    (typeof prevProps.children === 'string' || typeof prevProps.children === 'number')
  ) {
    workInProgress.effectTag |= CONTENT_RESET;
  }

  // mark ref
  const ref = workInProgress.ref;
  if (current === null && ref !== null || current !== null && current.ref !== ref) {
    workInProgress.effectTag |= REF;
  }

  reconcileChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}

function updateFunctionComponent(current, workInProgress, status) {
  const Component = workInProgress.type;
  const unresolvedProps = workInProgress.pendingProps;
  const nextProps = resolveDefaultProps(Component, unresolvedProps);
  // 更新状态
  if (current !== null) {
    const oldProps = current.memoizedProps;
    if (shallowEqual(oldProps, nextProps) && current.ref === workInProgress.ref) {
      cloneChildFibers(current, workInProgress);
      return workInProgress.child;
    }
  }

  // prepareWithState(current, WIP);
  const nextChildren = Component(nextProps);

  // nextChildren = finishedWith(Component, nextProps, nextChildren);
  workInProgress.effectTag |= PERFORMED;
  reconcileChildren(current, workInProgress, nextChildren);
  
  return workInProgress.child;
}

function updateClassComponent (current, workInProgress) {
  // todo
  // prepareToReadContext(workInProgress, renderExpirationTime);
  let unresolvedProps = workInProgress.pendingProps;
  const Component = workInProgress.type;
  const nextProps = workInProgress.elementType === Component ? 
    unresolvedProps : resolveDefaultProps(Component, unresolvedProps);
  const instance = workInProgress.stateNode;
  let shouldUpdate = false;
  let hasContext = false;

  if (instance === null) {
    // 更新 classComponent 
    if (current !== null) {
      current.alternate = null;
      workInProgress.alternate = null;
      workInProgress.effectTag |= PLACEMENT;
    }
    
    constructClassInstance(workInProgress, Component, nextProps);
    mountClassInstance(workInProgress, Component, nextProps);
    shouldUpdate = true;
  } else if (current === null) {
    shouldUpdate = resumeMountClassInstance(workInProgress, Component, nextProps);
  } else {
    shouldUpdate = updateClassInstance(current, workInProgress, Component, nextProps);
  }

  return finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext);
}

function constructClassInstance(workInProgress, Component, props) {
  var isLegacyContextConsumer = false;
  var unmaskedContext = EMPTY_CONTEXT;
  var context = EMPTY_CONTEXT;
  var contextType = Component.contextType;

  if (typeof contextType === 'object' && contextType !== null) {
    context = readContext(contextType);
  } else if (!disableLegacyContext) {
    unmaskedContext = getUnmaskedContext(workInProgress, Component, true);

    var contextTypes = Component.contextTypes;
    
    isLegacyContextConsumer = contextTypes !== null && contextTypes !== undefined;
    context = isLegacyContextConsumer ? getMaskedContext(workInProgress, unmaskedContext) : emptyContextObject;
  }

  const instance = new Component(props, context);
  const state = workInProgress.memoizedState = 
    instance.state !== null && instance.state !== undefined ? 
      instance.state : null;
  
  // 设置 Component updater
  instance.updater = classComponentUpdater;
  workInProgress.stateNode = instance;
  instance._reactInternalFiber = workInProgress;

  if (isLegacyContextConsumer) {
    cacheContext(workInProgress, unmaskedContext, context);
  }

  return instance;
}

function mountClassInstance(workInProgress, Component, newProps, renderExpirationTime) {
  const instance = workInProgress.stateNode;
  
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
  instance.refs = EMPTY_REFS;

  const contextType = Component.contextType;
  if (typeof contextType === 'object' && contextType !== null) {
    instance.context = readContext(contextType);
  } else if (disableLegacyContext) {
    instance.context = EMPTY_CONTEXT;
  } else {
    const unmaskedContext = getUnmaskedContext(workInProgress, Component, true);
    instance.context = getMaskedContext(workInProgress, unmaskedContext);
  }

  let updateQueue = workInProgress.updateQueue;

  if (updateQueue !== null) {
    processUpdateQueue(workInProgress, updateQueue, newProps, instance);
    instance.state = workInProgress.memoizedState;
  }

  // 新生命周期 API
  const getDerivedStateFromProps = Component.getDerivedStateFromProps;
  if (typeof getDerivedStateFromProps === 'function') {
    applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, newProps);
    instance.state = workInProgress.memoizedState;
  }

  // 调用旧的 API， 先判断：如果有新 API，则不执行旧API，否则执行
  if (
    typeof Component.getDerivedStateFromProps !== 'function' && 
    typeof instance.getSnapshotBeforeUpdate !== 'function' && 
    (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')
  ) {
    callComponentWillMount(workInProgress, instance);
    
    // 上面有可能会变更 updateQueue，所有还需要再次执行 processUpdateQueue，处理更新
    updateQueue = workInProgress.updateQueue;
    if (updateQueue !== null) {
      processUpdateQueue(workInProgress, updateQueue, newProps, instance);
      instance.state = workInProgress.memoizedState;
    }
  }

  if (typeof instance.componentDidMount === 'function') {
    workInProgress.effectTag |= UPDATE;
  }
}

function updateClassInstance(current, workInProgress, Component, newProps) {
  const instance = workInProgress.stateNode;
  const oldProps = workInProgress.memoizedProps;

  instance.props = workInProgress.type === workInProgress.elementType ? 
    oldProps : resolveDefaultProps(workInProgress.type, oldProps);

  const oldContext = instance.context;
  const contextType = Component.contextType;
  let nextContext = EMPTY_CONTEXT;

  if (typeof contextType === 'object' && contextType !== null) {
    nextContext = readContext(contextType);
  } else if (!disableLegacyContext) {
    var nextUnmaskedContext = getUnmaskedContext(workInProgress, Component, true);
    nextContext = getMaskedContext(workInProgress, nextUnmaskedContext);
  }

  const getDerivedStateFromProps = Component.getDerivedStateFromProps;
  const hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function';


  resetHasForceUpdateBeforeProcessing();

  const oldState = workInProgress.memoizedState;
  const updateQueue = workInProgress.updateQueue;
  let newState = instance.state = oldState;
  if (updateQueue !== null) {
    processUpdateQueue(workInProgress, updateQueue, newProps, instance);
    newState = workInProgress.memoizedState;
  }

  if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
    if (typeof instance.componentDidUpdate === 'function') {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= UPDATE;
      }
    }

    if (typeof instance.getSnapshotBeforeUpdate === 'function') {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= SNAPSHOT;
      }
    }

    return false;
  }

  if (typeof getDerivedStateFromProps === 'function') {
    applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, newProps);
    newState = workInProgress.memoizedState;
  }

  let shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, Component, oldProps, newProps, oldState, newState, nextContext);

  if (shouldUpdate) {
    if (
      !hasNewLifecycles && 
      (typeof instance.UNSAFE_componentWillUpdate === 'function' || typeof instance.componentWillUpdate === 'function')
    ) {
      if (typeof instance.componentWillUpdate === 'function') {
        instance.componentWillUpdate(newProps, newState, nextContext);
      }
    
      if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
        instance.UNSAFE_componentWillUpdate(newProps, newState, nextContext);
      }
    }

    if (typeof instance.componentDidUpdate === 'function') {
      workInProgress.effectTag |= UPDATE;
    }
    if (typeof instance.getSnapshotBeforeUpdate === 'function') {
      workInProgress.effectTag |= SNAPSHOT;
    }
  } else {
    if (typeof instance.componentDidUpdate === 'function') {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= UPDATE;
      }
    }
    if (typeof instance.getSnapshotBeforeUpdate === 'function') {
      if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
        workInProgress.effectTag |= SNAPSHOT;
      }
    }

    workInProgress.memoizedProps = newProps;
    workInProgress.memoizedState = newState;
  }

  instance.props = newProps;
  instance.state = newState;
  instance.context = nextContext;

  instance._reactInternalFiber = workInProgress;

  return shouldUpdate;
}

function resumeMountClassInstance(workInProgress, Component, newProps) {
  const instance = workInProgress.stateNode;
  const oldProps = workInProgress.memoizedProps;
  
  instance.props = oldProps;

  const oldContext = instance.context;
  const contextType = ctor.contextType;
  let nextContext = emptyContextObject;
  if (typeof contextType === 'object' && contextType !== null) {
    nextContext = readContext(contextType);
  } else if (!disableLegacyContext) {
    const nextLegacyUnmaskedContext = getUnmaskedContext(workInProgress, Component, true);
    nextContext = getMaskedContext(workInProgress, nextLegacyUnmaskedContext);
  }

  const getDerivedStateFromProps = Component.getDerivedStateFromProps;
  const hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function';
  const componentWillReceiveProps = instance.UNSAFE_componentWillReceiveProps || instance.componentWillReceiveProps;

  if (!hasNewLifecycles && typeof componentWillReceiveProps === 'function') {
    if (oldProps !== newProps || oldContext !== nextContext) {
      callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext);
    }
  }

  resetHasForceUpdateBeforeProcessing();

  const oldState = workInProgress.memoizedState;
  const updateQueue = workInProgress.updateQueue;
  let newState = instance.state = oldState;
  if (updateQueue !== null) {
    processUpdateQueue(workInProgress, updateQueue, newProps, instance);
    newState = workInProgress.memoizedState;
  }
  if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
    if (typeof instance.componentDidMount === 'function') {
      workInProgress.effectTag |= UPDATE;
    }
    return false;
  }

  if (typeof getDerivedStateFromProps === 'function') {
    applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, newProps);
    newState = workInProgress.memoizedState;
  }

  const shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, Component, oldProps, newProps, oldState, newState, nextContext);

  if (shouldUpdate) {
    const componentWillMount = instance.componentWillMount || instance.UNSAFE_componentWillMount;

    if (!hasNewLifecycles && typeof componentWillMount === 'function') {
      componentWillMount.call(instance);
    }

    if (typeof instance.componentDidMount === 'function') {
      workInProgress.effectTag |= UPDATE;
    }
  } else {
    if (typeof instance.componentDidMount === 'function') {
      workInProgress.effectTag |= UPDATE;
    }

    workInProgress.memoizedProps = newProps;
    workInProgress.memoizedState = newState;
  }

  instance.props = newProps;
  instance.state = newState;
  instance.context = nextContext;

  return shouldUpdate;
}

function finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext) {
  const ref = workInProgress.ref;
  if (
    current === null && 
    ref !== null || 
    current !== null && 
    current.ref !== ref) {
    workInProgress.effectTag |= REF;
  }

  if (!shouldUpdate) {
    if (hasContext) {
      invalidateContextProvider(workInProgress, Component, false);
    }

    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }

  const instance = workInProgress.stateNode;
  ReactCurrentOwner.current = workInProgress;
  
  const nextChildren = instance.render();
  
  workInProgress.effectTag |= PERFORMED_WORK;

  if (current !== null) {
    workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren);
  } else {
    reconcileChildren(current, workInProgress, nextChildren);
  }

  workInProgress.memoizedState = instance.state;

  if (hasContext) {
    invalidateContextProvider(workInProgress, Component, true);
  }

  return workInProgress.child;
}

function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
  const oldState = instance.state;
  const componentWillReceiveProps = instance.componentWillReceiveProps || instance.UNSAFE_componentWillReceiveProps;
  
  if (typeof componentWillReceiveProps === 'function') {
    componentWillReceiveProps.call(instance, newProps, nextContext);
  }

  if (instance.state !== oldState) {
    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
  }
}

function callComponentWillMount(workInProgress, instance) {
  const oldState = instance.state;
  const componentWillMount = instance.componentWillMount || instance.UNSAFE_componentWillMount;
  
  if (typeof componentWillMount === 'function') {
    componentWillMount.call(instance);
  }

  // 如果state对象变了，则更新updateQueue
  if (oldState !== instance.state) {
    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
  }
}

function applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps) {
  const prevState = workInProgress.memoizedState;
  const partialState = getDerivedStateFromProps(nextProps, prevState);

  // 合并 state
  const memoizedState = 
    partialState === null || partialState === undefined ? 
      prevState : { ...prevState, partialState };

  workInProgress.memoizedState = memoizedState;

  // 更新 updateQueue state
  const updateQueue = workInProgress.updateQueue;
  if (updateQueue !== null) {
    updateQueue.baseState = memoizedState;
  }
}

function checkShouldComponentUpdate(workInProgress, Component, oldProps, newProps, oldState, newState, nextContext) {
  const instance = workInProgress.stateNode;
  if (typeof instance.shouldComponentUpdate === 'function') {
    const shouldUpdate = instance.shouldComponentUpdate(newProps, newState, nextContext);
  
    return shouldUpdate;
  }

  if (Component.prototype && Component.prototype.isPureReactComponent) {
    return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
  }

  return true;
}

function resetHooks () {
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  currentlyRenderingFiber = null;

  currentHook = null;
  nextCurrentHook = null;
  firstWorkInProgressHook = null;
  workInProgressHook = null;
  nextWorkInProgressHook = null;


  remainingExpirationTime = NoWork;
  componentUpdateQueue = null;
  sideEffectTag = 0;

  didScheduleRenderPhaseUpdate = false;
  renderPhaseUpdates = null;
  numberOfReRenders = 0;
}

function renderWithHooks (current, workInProgress, Component, props, refOrContext) {
  currentlyRenderingFiber = workInProgress;
  nextCurrentHook = current !== null ? current.memoizedState : null;

  const children = Component(props, refOrContext);

  ReactCurrentDispatcher.current = ContextOnlyDispatcher;

  const renderedWork = currentlyRenderingFiber;

  renderedWork.memoizedState = firstWorkInProgressHook;
  renderedWork.updateQueue = componentUpdateQueue;
  renderedWork.effectTag |= sideEffectTag;
  renderedWork.statusTag = WORKING;

  const didRenderTooFewHooks = currentHook !== null && currentHook.next !== null;
  currentlyRenderingFiber = null;

  currentHook = null;
  nextCurrentHook = null;
  firstWorkInProgressHook = null;
  workInProgressHook = null;
  nextWorkInProgressHook = null;

  componentUpdateQueue = null;
  sideEffectTag = 0;

  return children;
}

function isContextProvider(type) {
  if (disableLegacyContext) {
    return false;
  } else {
    const childContextTypes = type.childContextTypes;
    return childContextTypes !== null && childContextTypes !== undefined;
  }
}

function mountIndeterminateComponent(current,  workInProgress) {
  const Component = workInProgress.type;
  if (current !== null) {
    current.alternate = null;
    workInProgress.alternate = null;
    workInProgress.effectTag |= PLACEMENT;
  }

  const props = workInProgress.pendingProps;
  let context;
  if (!disableLegacyContext) {
    const unmaskedContext = getUnmaskedContext(workInProgress, Component, false);
    context = getMaskedContext(workInProgress, unmaskedContext);
  }

  // prepareToReadContext(workInProgress);
  let value;
  
  ReactCurrentOwner.current = workInProgress;
  value = renderWithHooks(null, workInProgress, Component, props, context);

  workInProgress.effectTag |= PERFORMED_WORK;

  if (
    typeof value === 'object' && 
    value !== null && 
    typeof value.render === 'function' && 
    value.$$typeof === undefined
  ) {
    workInProgress.tag = CLASS_COMPONENT;

    resetHooks();

    let hasContext = false;
    if (isContextProvider(Component)) {
      hasContext = true;
      pushContextProvider(workInProgress);
    } else {
      hasContext = false;
    }

    workInProgress.memoizedState = value.state !== null && value.state !== undefined ? value.state : null;

    const getDerivedStateFromProps = Component.getDerivedStateFromProps;
    if (typeof getDerivedStateFromProps === 'function') {
      applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, props);
    }

    adoptClassInstance(workInProgress, value);
    mountClassInstance(workInProgress, Component, props);
    return finishClassComponent(null, workInProgress, Component, true, false);
  } else {
    workInProgress.tag = FUNCTION_COMPONENT;
   
    reconcileChildren(null, workInProgress, value);

    return workInProgress.child;
  }
}

function updateHostRoot (current, workInProgress) {
  // todo
  // pushHostRootContext(workInProgress);
  const updateQueue = workInProgress.updateQueue;

  const pendingProps = workInProgress.pendingProps;
  const memoizedState = workInProgress.memoizedState;
  const children = memoizedState !== null ? memoizedState.element : null;
  
  processUpdateQueue(
    workInProgress,
    updateQueue,
    pendingProps,
    null,
  );

  const nextState = workInProgress.memoizedState;
  const nextChildren = nextState.element;

  if (children === nextChildren) {
    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }

  reconcileChildren(current, workInProgress, nextChildren);

  return workInProgress.child;
}