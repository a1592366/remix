import { createFiberRoot } from '../reconciler/Fiber';
import { scheduleRootUpdate } from '../scheduler';

export default function renderIntoContainer (
  element,
  container,
  callback
) {
  const { _internalRoot: { current } } = container._reactRootContainer || (
    container._reactRootContainer = {
      _internalRoot: createFiberRoot(container)
    }
  );

  return scheduleRootUpdate(current, element, callback);
}