import Emitter from 'tiny-emitter';

export const [
  VIEW,
  LOAD,
  READY,
  SHOW,
  HIDE,
  UNLOAD,
  EVENT,
  DATA
] = [
  'view',
  'onLoad',
  'onReady',
  'onShow',
  'onHide',
  'onUnload',
  'onEvent',
  'onData'
]

export const Publisher = new class extends Emitter {
  Load (view, callback) {
    const callbackId = typeof callback === 'function' ?
      uuid.v4() : null;

    if (callbackId) {
      this.once(callbackId, callback);
    }

    Subscriber.emit(VIEW, { type: LOAD, argv: [view], callbackId });
  }

  Show (view) {
    Subscriber.emit(VIEW, {
      type: SHOW,
      argv: [view]
    })
  }

  Data (id, data) {
    Subscriber.emit(VIEW, {
      type: `${DATA}.${id}`,
      argv: [id, data]
    })
  }

  Event (...argv) {
    Subscriber.emit(VIEW, {
      type: EVENT,
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

    this.on(VIEW, ({ type, argv, callbackId }) => {
      if (callbackId) {
        argv.push((...argv) => {
          Publisher.emit(callbackId, ...argv);
        });
      }

      this.emit(type, ...argv);
    });
  }
}