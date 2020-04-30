import hoistNonReactStatics from 'hoist-non-react-statics';
import ReactHook, { useMemo, useState } from '../ReactHook';
import { shallowEqual } from '../shared';

export function useComponent (Component) {
  const proto = Component.prototype;
  if (
    proto.isReactComponent &&
    typeof proto.render === 'function'
  ) {
    const Wrapper = function (props) {
      const workInProgress = ReactHook.ReactCurrentHookFiber;
      
      if (workInProgress.stateNode) {
        const instance = useMemo(() => new Component(props), []);
        const [state] = useState(instance.state);
        const oldProps = workInProgress.memoizedProps;
    
        instance.props = oldProps;
        instance.state = state;
  
        const oldState = workInProgress.memoizedState;
        let newState = instance.state = state;
  
        applyDerivedStateFromProps(workInProgress, Component, props);
        let shouldUpdate = checkShouldComponentUpdate(workInProgress, Component, oldProps, props, oldState, newState);
  
        if (shouldUpdate) {
          debugger;
          return instance.render();
        }
  
      } else {
        const instance = useMemo(() => new Component(props), []);
        const [state, setState] = useState(instance.state);
        workInProgress.stateNode = instance;
        workInProgress.memoizedState = {
          ...workInProgress.memoizedState,
          ...state,
        }
  
        instance.props = props;
        instance.state = state;
        instance.setState = setState;
    
        applyDerivedStateFromProps(workInProgress, Component, props);
        return instance.render();
      }
  
    }

    Wrapper.displayName = Component.name;
  
    return hoistNonReactStatics(Wrapper, Component);
  } else {
    throw new Error(`Must provide react class component`);
  }
}

function applyDerivedStateFromProps(workInProgress, Component, nextProps) {
  const getDerivedStateFromProps = Component.getDerivedStateFromProps;
  if (typeof getDerivedStateFromProps === 'function') {
    const instance = workInProgress.stateNode;
    const memoizedState = workInProgress.memoizedState;
    const nextState = getDerivedStateFromProps(nextProps, memoizedState);

    instance.state = workInProgress.memoizedState = nextState === null || nextState === undefined ? 
      memoizedState : 
      { ...memoizedState, partialState };
  }
}

function checkShouldComponentUpdate(workInProgress, Component, oldProps, newProps, oldState, newState) {
  const instance = workInProgress.stateNode;
  if (typeof instance.shouldComponentUpdate === 'function') {
    const shouldUpdate = instance.shouldComponentUpdate(newProps, newState);
  
    return shouldUpdate;
  }

  if (Component.prototype && Component.prototype.isPureReactComponent) {
    return !shallowEqual(oldProps, newProps) || 
      !shallowEqual(oldState, newState);
  }

  return true;
}
