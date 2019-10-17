import EventEmitter from 'events';
import * as types from './types';


class Notification extends EventEmitter {
  post (type, e) {
    this.emit(type, e);
  }

  app () {    
    return {
      launch: (...argv) => {
        this.post(types.APPLICATION.LAUNCH, argv);
      },

      show: (...argv) => {
        this.post(types.APPLICATION.SHOW, argv);
      },

      hide (...argv) {
        this.post(types.APPLICATION.HIDE, argv);
      },

      error (...argv) {
        this.post(types.APPLICATION.ERROR, argv);
      }
    }
  }

  view () {
    return {

    }
  }


}

export * from './types';
export default new Notification();