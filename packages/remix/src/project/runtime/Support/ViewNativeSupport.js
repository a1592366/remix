import uuid from 'uuid';
import Emitter from 'tiny-emitter';
import View, { Load, Show, Ready, Unload, Hide, Event, Data } from './types/View';

export {
  Load,
  Show,
  Ready,
  Unload,
  Hide,
  Event,
  Data
}

export const Publisher = new class extends Emitter {
  Load (view, callback) {
    const callbackId = typeof callback === 'function' ?
      uuid.v4() : null;

    if (callbackId) {
      this.once(callbackId, callback);
    }

    Subscriber.emit(View, {
      type: Load,
      argv: [view],
      callbackId
    });
  }

  Show (view) {
    Subscriber.emit(View, {
      type: Show,
      argv: [view]
    })
  }

  Data (id, data) {
    Subscriber.emit(View, {
      type: `${Data}.${id}`,
      argv: [id, data]
    })
  }

  Event (...argv) {
    Subscriber.emit(View, {
      type: Event,
      argv,
    })
  }

  Lifecycle (type, uuid) {
    // console.log(uuid);
  }
}

export const Subscriber = new class extends Emitter {
  constructor () {
    super();

    this.on(View, ({ type, argv, callbackId }) => {
      if (callbackId) {
        argv.push((...argv) => {
          Publisher.emit(callbackId, ...argv);
        });
      }

      this.emit(type, ...argv);
    });
  }
}