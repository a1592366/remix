import { createFiberRoot } from '../reconciler/Fiber';
import { scheduleRootUpdate } from '../scheduler';
import ReactCurrentRoot from '../react/ReactCurrentRoot';

export default function renderIntoContainer (
  element,
  container,
  callback
) {
  const { _internalRoot } = container._reactRootContainer || (
    container._reactRootContainer = {
      _internalRoot: createFiberRoot(container)
    }
  );

  ReactCurrentRoot.current = container._reactRootContainer;
  const root = _internalRoot;

  return scheduleRootUpdate(root, element, callback);
}