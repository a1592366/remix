import { INDETERMINATE_COMPONENT, HOST_ROOT, CLASS_COMPONENT, HOST_COMPONENT, FUNCTION_COMPONENT, HOST_TEXT } from '../../shared/workTags';
import { PLACEMENT } from '../../shared/effectTags';
import { isNullOrUndefined, isContextProvider, isString } from '../../shared/is';
import updateHostInstance from '../updater/updateHostInstance';
import createInstance from '../../renderer/config/createInstance';
import createTextInstance from '../../renderer/config/createTextInstance';
import ReactCurrentRootInstance from '../../react/ReactCurrentRootInstance';
import setInitialProperties from '../../renderer/config/setInitialProperties';
import appendAllChildren from '../../renderer/config/appendAllChildren';
import updateHostText from '../updater/updateHostText';


export default function completeWork (
  current,
  workInProgress
) {
  const nextProps = workInProgress.pendingProps;
  const { tag } = workInProgress;

  switch (tag) {
    case CLASS_COMPONENT: {
      const Component = workInProgress.type;
      if (isContextProvider(Component)) {
        // popContext();
      }
      break;
    }

    case FUNCTION_COMPONENT: {
      break;
    };

    case HOST_ROOT: {
      const root = workInProgress.stateNode;

      if (root.pendingContext) {
        root.context = root.pendingContext;
        root.pendingContext = null;
      }

      if (isNullOrUndefined(current) || isNullOrUndefined(current.child)) {
        workInProgress.effectTag &= ~PLACEMENT;
      }

      // updateHostContainer()

      break;
    }

    case HOST_COMPONENT: {
      const type = workInProgress.type;
      const nextProps = workInProgress.pendingProps;
      const rootContainerInstance = getRootHostContainer();

      if (!isNullOrUndefined(current) && !isNullOrUndefined(workInProgress.stateNode)) {
        updateHostInstance(current, workInProgress, type, nextProps);
      } else {
        const instance = createInstance(type, nextProps, rootContainerInstance, null, workInProgress);

        workInProgress.stateNode = instance;

        appendAllChildren(instance, workInProgress);
        setInitialProperties(instance, type, nextProps, rootContainerInstance);
      }

      break;
    }

    case HOST_TEXT: {
      const text = nextProps;
      if (current && !isNullOrUndefined(workInProgress.stateNode)) {
        updateHostText(current, workInProgress, current.memoizedProps, text);
      } else {
        const rootContainerInstance = getRootHostContainer();
        workInProgress.stateNode = createTextInstance(text, rootContainerInstance, {}, workInProgress);
      }

      break;
    }

    case isContextProvider: {
      break;
    }
  }
}

function getRootHostContainer () {
  const rootInstance = ReactCurrentRootInstance.current;
  return rootInstance;
}