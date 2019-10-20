import ApplicationTransport from './ApplicationTransport';
import ViewControllerTransport from './ViewControllerTransport';

const transports = {};

export * from './types';
export default {
  get app () {
    if (transports.app) {
      return transports.app;
    }

    return transports.app = new ApplicationTransport()
  },

  get view () {
    if (transports.view) {
      return transports.view;
    }

    return transports.view = new ViewControllerTransport()
  }
}