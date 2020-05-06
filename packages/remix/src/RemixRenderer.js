import { createFiberRoot } from './RemixFiber';
import { updateContainer } from './RemixScheduler';

// ---- export ----
export function render (element, container, callback) {
  const root = container.__internalRoot || (
    container.__internalRoot = createFiberRoot(container)
  );

  updateContainer(element, root, callback);
}

export default render;