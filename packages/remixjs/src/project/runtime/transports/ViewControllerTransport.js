import uuid from 'uuid';
import Tunnel from '../tunnel';
import { VIEW } from './types';
import { isFunction } from '../../../shared/is';

export default class ViewControllerTransport  extends Tunnel {
  constructor () {
    super();

    this.on(VIEW, this.onMessage);
  }

  dispatch () {
    debugger;
  }

  post = (type, argv, callback) => {
    const callbackId = isFunction(callback) ? uuid.v4() : null

    if (callbackId) {
      this.once(callbackId, callback);
    }

    super.post({
      type: String(VIEW),
      body: {
        type,
        argv,
        callbackId
      }
    });
  }

  reply (body) {
    super.post({
      type: String(VIEW),
      body
    })
  }

  load (data, callback) {
    this.post(VIEW.LOAD, [data], callback);
  }

  onLoad (callback) {
    this.on(VIEW.LOAD, callback);
  }

  onReady (callback) {
    this.on(VIEW.READY, callback);
  }
}