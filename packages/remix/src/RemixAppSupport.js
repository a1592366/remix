import Emitter from 'tiny-emitter';

export const [
  APP,
  LAUNCH,
  ERROR
] = [
  'App',
  'onLaunch',
  'onError'
]

export const Publisher = new class extends Emitter {
  Launch (options) {
    Subscriber.emit(APP, {
      type: LAUNCH,
      argv: [options]
    })
  }
}

export const Subscriber = new class extends Emitter {
  constructor () {
    super();

    this.on(APP, ({ type, argv, callbackId }) => {
      this[type](...argv, callbackId);
    });
  }

  onLaunch (options) {
  }
}