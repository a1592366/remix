import scheduleWork from '../scheduler/scheduleWork';

export default function renderIntoContainer (
  element,
  container,
  callback
) {

  const { current } = container._reactRootContainer || (
    container._reactRootContainer = {
      internalRoot: createFiberRoot(container)
    }
  );

  return scheduleWork(current, element, callback);
}