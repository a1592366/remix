import uuid from 'uuid';
import Tunnel from '../tunnel';
import { API } from './types';
import { isFunction } from '../../../shared/is';
import createLogicSocket from './Classes/LogicSocket';

const isSuccess = (data) => {
  if (/(\w)+\:ok/g.test(data.errMsg)) {
    return true;
  }
}

export default class APITransport extends Tunnel {
  constructor () {
    super();

    this.on(API, this.onMessage);
  }

  post = (type, argv, callback) => {
    const callbackId = isFunction(callback) ? uuid.v4() : null

    if (callbackId) {
      this.once(callbackId, callback);
    }

    super.post({
      type: String(API),
      body: {
        type,
        argv,
        callbackId
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