import { REPLACE_STATE, FORCE_UPDATE, UPDATE_STATE } from '../shared/updateTags';
import { PLACEMENT } from '../shared/effectTags';
import { HOST_ROOT } from '../shared/workTags';

export const [ MOUNTING, MOUNTED, UNMOUNTED ] = [1, 2, 3];

export default {
  isMounted (component) {
    const fiber = component._reactInternalFiber;
  
    if (fiber) {
      let node = fiber;
      if (!fiber.alternate) {
        if ((node.effectTag & PLACEMENT) !== NoEffect) {
          return MOUNTING;
        }
        while (node.return) {
          node = node.return;
          if ((node.effectTag & PLACEMENT) !== NoEffect) {
            return MOUNTING;
          }
        }
      } else {
        while (node.return) {
          node = node.return;
        }
      }
      if (node.tag === HOST_ROOT) {
        return MOUNTED;
      }
  
      return UNMOUNTED;
    }
  
    return false;
  },
  enqueueSetState (inst, payload, callback) {
    const fiber = inst._reactInternalFiber;
    
    const update = createUpdate();
    update.payload = payload;

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleWork(fiber);
  },
  enqueueReplaceState (inst, payload, callback) {
    const fiber = inst._reactInternalFiber;
    const update = createUpdate();
    
    update.tag = REPLACE_STATE;
    update.payload = payload;

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    // if (revertPassiveEffectsChange) {
    //   flushPassiveEffects();
    // }

    enqueueUpdate(fiber, update);
    scheduleWork(fiber);
  },

  enqueueForceUpdate (inst, callback) {
    const fiber = inst._reactInternalFiber;
    const update = createUpdate();
    
    update.tag = FORCE_UPDATE;

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleWork(fiber);
  }
};
