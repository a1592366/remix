import { createRootFiber } from '../Fiber';
import { scheduleRootUpdate } from '../ReactScheduler';

export const ReactCurrentRoot = { current: null }

function render(element, container, callback) {
  const { internalRoot: { workInProgress } } = container._reactRootContainer || (
    container._reactRootContainer = {
      internalRoot: createRootFiber(container)
    }
  );

  ReactCurrentRoot.current = container._reactRootContainer;

  workInProgress.update = {
    payload: { element },
    callback
  }
  
  scheduleRootUpdate(workInProgress);
}

export {
  render
}

export default {
  render
};