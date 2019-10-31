import createUpdate from './createUpdate';
import enqueueUpdate from './enqueueUpdate';
import { isFunction } from '../shared/is';

import schedule from './index';

function scheduleWork (current, element, callback) {
  const update = createUpdate();

  update.payload = {
    element
  }

  if (isFunction(callback)) {
    update.callback = callback;
  }

}