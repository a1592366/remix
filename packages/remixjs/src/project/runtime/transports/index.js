import ApplicationTransport from './ApplicationTransport';
import ViewControllerTransport from './ViewControllerTransport';

const transports = {};

export * from './types';
export default {
  get app () {
    if (transports.app) {
      return transports.app;
    }

    transports.view = transports.view || new ViewControllerTransport();

    return transports.app = new ApplicationTransport()
  },

  get view () {
    if (transports.view) {
      return transports.view;
    }

    transports.app = transports.app || new ApplicationTransport();

    return transports.view = new ViewControllerTransport()
  }
}