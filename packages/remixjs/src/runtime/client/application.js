import Worker from '../worker';
import { mode, types, ws, protocol } from '../env';
import message from '../message';
import request from './request';
import selector from './selector';
import templateTypes from './types';

const { level: { API, COMMON, REQUEST, DEVTOOLS, SELECTOR }, types: messageTypes, status: { SUCCESS, ERROR, READY, DESTROY }  } = message;
const inWx = typeof wx === 'object';

class Application {
  constructor (options = {}) {
    this.isRemote = mode === types.DEBUGGER || mode === types.REMOTE;

    this.uri = this.isRemote ? 
      ws : 'workers/index.js';

    this.type = this.isRemote? 
        Worker.types.SOCKET : Worker.types.WORKER

    this.worker = new Worker({
      uri: this.uri,
      type: this.type,
      protocols: [protocol]
    });

    this.isReady = false;
    this.isInitialized = false;
    this.messages = [];

    this.registerEvents();
  }

  registerEvents () {
    this.worker.on(API, this.onAPIMessage);
    this.worker.on(REQUEST, this.onRequestMessage);
    this.worker.on(DEVTOOLS, ({ status, data }) => {
      switch (status) {
        case READY:
          this.onReady(data);
          break;

        case DESTROY:
          break;
      }
    });

    this.worker.on(SELECTOR, this.onSelectorMessage);
  }

  postMessage = (data, callback) => {
    if (this.isReady) {
      return this.worker.postMessage(data, callback);
    }

    this.messages.push({ data, callback });
  }

  onReady = ({ route }) => {
    this.isReady = true;

    this.register(route);
  }

  onAPIMessage = ({ name, argv, callbackId, type }) => {
    if (inWx) {
      let res;

      switch (type) {
        case templateTypes.CALLBACK:
          wx[name]((res) => {
            this.worker.postMessage({
              level: COMMON,
              type: messageTypes.CALLBACK,
              callbackId,
              argv: [res]
            });
          });
          break;

        case templateTypes.OPTIONS:
          const options = argv[0];

          wx[name]({
            ...options,
            complete: (res) => {
              const { errMsg: error } = res;
              const status = /:ok/g.test(error) ? SUCCESS : ERROR;
              const argv = { status, data: res, error };
              
              this.worker.postMessage({
                level: COMMON,
                type: messageTypes.CALLBACK,
                callbackId,
                argv: [argv]
              });
            }
          });
          break;

        case templateTypes.ARGUMENTS:
          switch (name) {
            case 'getCurrentRoutes':
              res = getCurrentRoutes();
              break;
            case 'getCurrentRoute':
              res = getCurrentRoute();
              break;
            default:
              res = wx[name](...argv);
              break;
          }

          this.worker.postMessage({
            level: COMMON,
            type: messageTypes.CALLBACK,
            callbackId,
            argv: [res]
          });
          break;
      }
      
    }
  }

  onSelectorMessage = (res) => {
    selector(res);
  }

  onRequestMessage = (res) => {
    request(res);
  }

  initializeApplication (route) {
    if (this.isInitialized) {
      route = route[0] === '/' ? route : `/${route}`;

      wx.reLaunch({ url: route });
    } else {
      if (typeof App === 'function') {
        const { level: { APPLICATION }, types: { LIFECYCLE } } = message;
        const { worker } = this;
        const lifecycleMethod = [ 'onLaunch', 'onShow', 'onHide', 'onPageNotFound', 'onError'];
        const lifecycle = {};
  
        lifecycleMethod.forEach(name => {
          lifecycle[name] = function (...argv) {
            if (worker) {
              worker.postMessage({
                level: APPLICATION,
                type: LIFECYCLE,
                name
              });
            }
          }
        });
        
        App(lifecycle);

        this.isInitialized = true;
      }
    }
  }

  register (route) {
    this.initializeApplication(route);

    if (this.messages.length > 0) {
      let message;

      while(message = this.messages.shift()) {
        this.worker.postMessage(message.data, message.callback);
      }
    }
  }
}

let application;

export function getApplication () {
  return application || (application = new Application());
}

export function getCurrentRoutes () {
  const pages = getCurrentPages();
  
  return pages.map(page => page.route);
}

export function getCurrentRoute () {
  const routes = getCurrentRoutes();

  return routes[routes.length - 1];
}


