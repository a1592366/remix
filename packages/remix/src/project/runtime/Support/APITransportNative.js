import uuid from 'uuid';
import Tunnel from '../tunnel';
import { API } from './types';
import { isFunction } from '../../../shared/is';

const isSuccess = (data) => {
  if (/(\w)+\:ok/g.test(data.errMsg)) {
    return true;
  }
}

export default class APITransport extends Tunnel {
  constructor () {
    super();
  }

  post = (type, argv, callback) => {
    super.post({
      type: String(API),
      body: {
        type,
        argv,
        callback
      }
    });
  }

  reply (body) {
    super.post({
      type: String(API),
      body
    })
  }

  promisify (api, options) {
    return new Promise((resolve, reject) => {
      this.post(api, [options], (data) => {
        if (isSuccess(data)) {
          resolve(data);
        } else {
          reject(data);
        }

        if (options && isFunction(options.complete)) {
          options.complete(data);
        }
      });
    })
  }

  login (options) { return this.promisify(API.LOGIN, options); }
  request (options) { return this.promisify(API.REQUEST, options); }
  navigateTo (options) { return this.promisify(API.NAVIGATE_TO, options); }
  navigateBack (options) { return this.promisify(API.NAVIGATE_BACK, options); }
  connectSocket (options) { return this.promisify(API.CONNECT_SOCKET, options, () => {}); }
  // store
  getStorage (options) { return this.promisify(API.GET_STORAGE, options); }
  setStorage (options) { return this.promisify(API.SET_STORAGE, options); }
  clearStorage (options) { return this.promisify(API.CLEAR_STORAGE, options); }
  removeStore (options) { return this.promisify(API.REMOVE_STORAGE, options); }
  getStorageInfo (options) { return this.promisify(API.GET_STORAGE_INFO, options); }
  setStorageSync (key, value) { this.post(API.SET_STORAGE_SYNC, [key, value]) }
  clearStorageSync (key) { this.post(API.CLEAR_STORAGE_SYNC, [key]) }
  removeStorageSync (key) { this.post(API.REMOVE_STORAGE_SYNC, [key]) }
  getStorageInfoSync () {
    let returnValue = null;
    this.post(API.GET_STORAGE_INFO_SYNC, [], (value) => {
      returnValue = value;
    }) ;
    return returnValue;
  }
  getStorageSync (key) { 
    let returnValue = null;
    this.post(API.GET_STORAGE_SYNC, [key], (value) => {
      returnValue = value;
    });
    return returnValue;
  }

  showTabBar (options) { return this.promisify(API.SHOW_TABBAR, options); }
  hideTabBar (options) { return this.promisify(API.HIDE_TABBAR, options); }
}