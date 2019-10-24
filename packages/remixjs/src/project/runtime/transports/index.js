import ApplicationTransport from './ApplicationTransport';
import ViewControllerTransport from './ViewControllerTransport';
import APITransport from './APITransport';

import env from '../../../../env';



function createTransport () {
  const transports = {};

  return {
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
    },
  
    get api () {
      if (transports.api) {
        return transports.api;
      }
  
      return transports.api = new APITransport();
    }
  }
}

const logicTransports = createTransport();
const terminalTransports = env.isInspectMode ? logicTransports : createTransport();

export {
  logicTransports,
  terminalTransports
}

export * from './types';



  