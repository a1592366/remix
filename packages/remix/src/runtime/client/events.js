import { events } from '@expri/events';
import { getApplication, getCurrentRoute } from './application';
import message from '../message';

const exports = {};

events.forEach(evt => {
  exports[evt.short] = function (e) {
    const { node } = this.data;
    const { worker } = getApplication();

    worker.postMessage({
      level: message.level.COMPONENT,
      type: message.types.EVENT,
      argv: [{
        node,
        event: e,
        name: evt,
        route: getCurrentRoute()
      }]
    });
  }
});

export default exports;
