import { request } from 'requestidlecallback';
import { HOST_ROOT, HOST_COMPONENT, HOST_TEXT, FUNCTION_COMPONENT, CLASS_COMPONENT, INDETERMINATE_COMPONENT } from '../shared/workTags';
import { EXPIRE_TIME, EMPTY_REFS, EMPTY_CONTEXT } from '../shared';
import { PERFORMED, PLACEMENT, UPDATE, PERFORMED_WORK, REF, SNAPSHOT, INCOMPLETE, NO_EFFECT, CONTENT_RESET } from '../shared/effectTags';
import { resolveDefaultProps, shallowEqual } from '../shared';
import { createWorkInProgress } from '../reconciler/Fiber';
import { reconcileChildren, cloneChildFibers } from '../reconciler';
import { completeUnitOfWork, completeRoot } from './completeWork';
import { 
  createUpdate, 
  enqueueUpdate, 
  processUpdateQueue, 
  resetHasForceUpdateBeforeProcessing, 
  checkHasForceUpdateAfterProcessing
} from './updateQueue';
import classComponentUpdater from './classComponentUpdater';
import ReactCurrentOwner from '../react/ReactCurrentOwner';



let nextUnitOfWork = null;
let workInProgress = null;
let disableLegacyContext = true;

export function requestWork (root) {
  request((deadline) => performWork(deadline, root));
}

function performWork (deadline, root) {
  workLoop(deadline, root);

  if (nextUnitOfWork) {
    requestWork(root);
  }

  if (nextUnitOfWork === null) {
    const finishedWork = root.current.alternate; // workInProgress
    if (finishedWork) {
      completeRoot(root, finishedWork)
    }
  }
}

function workLoop(deadline, root) {
  if (nextUnitOfWork === null) {
    nextUnitOfWork = createWorkInProgress(root, null);
  }

  // 如果还有工作，有空档时间
  while (
    nextUnitOfWork !== null && 
    deadline.timeRemaining() > EXPIRE_TIME
  ) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
}

function performUnitOfWork (unitOfWork) {
  const current = unitOfWork.alternate;
  let next = beginWork(current, unitOfWork);

  console.log(next);

  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  
  if (next === null) {
    next = completeUnitOfWork(unitOfWork);
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
      if (workInProgress.status) {
        cloneChildFibers(current, workInProgress);
        return workInProgress.child;
      }
    }

  }
  

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
  const unresolvedProps = workInProgress.props;
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
    shouldUpdate = updateClassInstance(current$$1, workInProgress, Component, nextProps);
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

  const updateQueue = workInProgress.updateQueue;

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
  const contextType = ctor.contextType;
  let nextContext = EMPTY_CONTEXT;

  if (typeof contextType === 'object' && contextType !== null) {
    nextContext = readContext(contextType);
  } else if (!disableLegacyContext) {
    var nextUnmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
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

    return bailoutOnAlreadyFinishedWork(current$$1, workInProgress);
  }

  const instance = workInProgress.stateNode;

  ReactCurrentOwner.current = workInProgress;
  
  const nextChildren = instance.render();
  
  workInProgress.effectTag |= PERFORMED_WORK;

  if (current !== null) {
    workInProgress.child = reconcileChildFibers(workInProgress, current.child, null);
    workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren);
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

function mountIndeterminateComponent(
  current, 
  workInProgress,
) {
  debugger;
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

  debugger;

  // prepareToReadContext(workInProgress);
  let value;

  {
    if (Component.prototype && typeof Component.prototype.render === 'function') {
      var componentName = getComponentName(Component) || 'Unknown';

      if (!didWarnAboutBadClass[componentName]) {
        warningWithoutStack$1(false, "The <%s /> component appears to have a render method, but doesn't extend React.Component. " + 'This is likely to cause errors. Change %s to extend React.Component instead.', componentName, componentName);
        didWarnAboutBadClass[componentName] = true;
      }
    }

    if (workInProgress.mode & StrictMode) {
      ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, null);
    }

    ReactCurrentOwner$3.current = workInProgress;
    value = renderWithHooks(null, workInProgress, Component, props, context, renderExpirationTime);
  }
  // React DevTools reads this flag.
  workInProgress.effectTag |= PerformedWork;

  if (typeof value === 'object' && value !== null && typeof value.render === 'function' && value.$$typeof === undefined) {
    {
      var _componentName = getComponentName(Component) || 'Unknown';
      if (!didWarnAboutModulePatternComponent[_componentName]) {
        warningWithoutStack$1(false, 'The <%s /> component appears to be a function component that returns a class instance. ' + 'Change %s to a class that extends React.Component instead. ' + "If you can't use a class try assigning the prototype on the function as a workaround. " + "`%s.prototype = React.Component.prototype`. Don't use an arrow function since it " + 'cannot be called with `new` by React.', _componentName, _componentName, _componentName);
        didWarnAboutModulePatternComponent[_componentName] = true;
      }
    }

    // Proceed under the assumption that this is a class instance
    workInProgress.tag = ClassComponent;

    // Throw out any hooks that were used.
    resetHooks();

    // Push context providers early to prevent context stack mismatches.
    // During mounting we don't know the child context yet as the instance doesn't exist.
    // We will invalidate the child context in finishClassComponent() right after rendering.
    var hasContext = false;
    if (isContextProvider(Component)) {
      hasContext = true;
      pushContextProvider(workInProgress);
    } else {
      hasContext = false;
    }

    workInProgress.memoizedState = value.state !== null && value.state !== undefined ? value.state : null;

    var getDerivedStateFromProps = Component.getDerivedStateFromProps;
    if (typeof getDerivedStateFromProps === 'function') {
      applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, props);
    }

    adoptClassInstance(workInProgress, value);
    mountClassInstance(workInProgress, Component, props, renderExpirationTime);
    return finishClassComponent(null, workInProgress, Component, true, false);
  } else {
    // Proceed under the assumption that this is a function component
    workInProgress.tag = FunctionComponent;
    {
      if (disableLegacyContext && Component.contextTypes) {
        warningWithoutStack$1(false, '%s uses the legacy contextTypes API which is no longer supported. ' + 'Use React.createContext() with React.useContext() instead.', getComponentName(Component) || 'Unknown');
      }

      if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
        // Only double-render components with Hooks
        if (workInProgress.memoizedState !== null) {
          value = renderWithHooks(null, workInProgress, Component, props, context, renderExpirationTime);
        }
      }
    }
    reconcileChildren(null, workInProgress, value, renderExpirationTime);
    {
      validateFunctionComponentInDev(workInProgress, Component);
    }
    return workInProgress.child;
  }
}

function updateHostRoot (current, workInProgress) {
  // todo
  // pushHostRootContext(workInProgress);

  const rootRender = workInProgress.rootRender;

  const updateQueue = workInProgress.updateQueue;
  const nextProps = workInProgress.pendingProps;
  
  processUpdateQueue(workInProgress, updateQueue, nextProps, null);
  
  const state = workInProgress.memoizedState;
  const nextState = workInProgress.memoizedState;
  const children = state === null ?  state.element : null;
  const nextChildren = nextState.element;

  if (children === nextChildren) {
    cloneChildFibers(current, workInProgress);
  } else {
    reconcileChildren(current, workInProgress, nextChildren);
  }

  return workInProgress.child;
}