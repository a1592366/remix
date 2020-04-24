import EventEmitter from 'events';
import { APPLICATION, VIEW } from './types';


class Transport extends EventEmitter {
  post (type, e) {
    this.emit(type, e);
  }

  app () {    
    return {
      launch: (...argv) => {
        this.post(APPLICATION.LAUNCH, argv);
      },

      show: (...argv) => {
        this.post(APPLICATION.SHOW, argv);
      },

      hide (...argv) {
        this.post(APPLICATION.HIDE, argv);
      },

      error (...argv) {
        this.post(APPLICATION.ERROR, argv);
      }
    }
  }

  view () {
    return {
      load (...argv) {
        this.post(VIEW.LOAD, argv);
      }
    }
  }


}

export * from './types';
export default new Transport();