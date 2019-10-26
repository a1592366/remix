import uuid from 'uuid';
import Tunnel from '../tunnel';
import { VIEW } from './types';
import { isFunction } from '../../../shared/is';

export default class ViewControllerTransportNative  extends Tunnel {
  constructor () {
    super();
  }

  dispatch (type, id, e) {
    // console.log(id);
  }

  post = (type, argv, callback) => {
    super.post({
      type: String(VIEW),
      body: {
        type,
        argv,
        callback
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