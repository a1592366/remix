import ApplicationTransport from './ApplicationTransport';
import ViewControllerTransport from './ViewControllerTransport';
import APITransport from './APITransport';
import ApplicationTransportNative from './ApplicationTransportNative';
import ViewControllerTransportNative from './ViewControllerTransportNative';
import APITransportNative from './APITransportNative';
import env from '../../../../env';


const { isInspectMode } = env;
const transports = {};

const createApplicationTransport = () => {
  return transports.app = transports.app || 
    (!isInspectMode ? new ApplicationTransportNative() : new ApplicationTransport());
}

const createViewControllerTransport = () => {
  return transports.view = transports.view || 
    (!isInspectMode ? new ViewControllerTransportNative() : new ViewControllerTransport());
}

const createAPITransport = () => {
  return transports.api = transports.api || 
    (!isInspectMode ? new APITransportNative() : new APITransport());
}




export * from './types';
export default {
  get app () {
    if (transports.app) {
      return transports.app;
    }

    transports.view = createViewControllerTransport();

    return transports.app = createApplicationTransport()
  },

  get view () {
    if (transports.view) {
      return transports.view;
    }

    transports.app = createApplicationTransport();

    return transports.view = createViewControllerTransport()
  },

  get api () {
    if (transports.api) {
      return transports.api;
    }

    return transports.api = createAPITransport()
  }
}