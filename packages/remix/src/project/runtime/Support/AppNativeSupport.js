import uuid from 'uuid';
import Emitter from 'tiny-emitter';
import App, { Launch } from './types/App';


export const Publisher = new class extends Emitter {
  Launch (options) {
    Subscriber.emit(App, {
      type: Launch,
      argv: [options]
    })
  }
}

export const Subscriber = new class extends Emitter {
  constructor () {
    super();

    this.on(App, ({ type, argv, callbackId }) => {
      this[type](...argv, callbackId);
    });
  }

  onLaunch (options) {
  }
}