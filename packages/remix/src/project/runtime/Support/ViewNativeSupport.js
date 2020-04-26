import uuid from 'uuid';
import Emitter from 'tiny-emitter';
import View, { Load } from './types/View';


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
    })
  }

  Event (type, ) {
    debugger;
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

      this[type](...argv);
    });
  }

  onLoad () {}
  onReady () {}
  onUnload () {}
}