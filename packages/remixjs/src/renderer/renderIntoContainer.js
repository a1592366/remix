import scheduleRootUpdate from '../scheduler/scheduleRootUpdate';
import { createFiberRoot } from '../reconciler/FiberNode';

import ReactCurrentRootInstance from '../react/ReactCurrentRootInstance';

class ReactRoot {
  constructor (container) {
    this._internalRoot = createContainer(container);
  }

  render (element, callback) {
    updateContainer(element, this._internalRoot, callback);
  }
}

export default function renderIntoContainer (
  element,
  container,
  callback
) {
  const { current } = container._reactRootContainer || ({
    _internalRoot: createFiberRoot(container)
  });

  ReactCurrentRootInstance.current = container;
  
  scheduleRootUpdate(current, current, callback);
}