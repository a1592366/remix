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

  createCommonPromise (api, options) {
    return new Promise((resolve, reject) => {
      this.post(api, [options], (data) => {
        if (isSuccess(data)) {
          resolve(data);
        } else {
          reject(data);
        }

        if (isFunction(options.complete)) {
          options.complete(data);
        }
      });
    })
  }

  request (options) {
    return this.createCommonPromise(API.REQUEST, options);
  }

  navigateTo (options) {
    return this.createCommonPromise(API.NAVIGATE_TO, options);
  }

  navigateBack (options) {
    return this.createCommonPromise(API.NAVIGATE_BACK, options);
  }

  connectSocket (options) {
    return new createLogicSocket(this, options);
  }
}