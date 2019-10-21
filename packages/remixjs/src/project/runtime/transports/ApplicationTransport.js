import uuid from 'uuid';
import Tunnel from '../tunnel';
import { APPLICATION } from './types';
import { isFunction } from '../../../shared/is';

export default class ApplicationTransport extends Tunnel {
  constructor () {
    super();

    this.on(APPLICATION, this.onMessage);
  }

  onMessage = (id, type, { argv, callbackId }) => {
    if (callbackId) {
      this.emit(callbackId, ...argv);
    }
  }

  post = (type, argv, callback) => {
    const callbackId = isFunction(callback) ? uuid.v4() : null

    if (callbackId) {
      this.once(callbackId, callback);
    }

    super.post({
      type: String(APPLICATION),
      body: {
        type,
        argv,
        callbackId
      }
    });
  }

  inspect (id, callback) {
    this.post(APPLICATION.INSPECT, [id], callback);
  }

  launch (options) {
    this.post(APPLICATION.LAUNCH, [options]);
  }

  show () {
    this.post(APPLICATION.SHOW, []);
  }
  hide () {
    this.post(APPLICATION.HIDE, []);
  }

  error (error) {
    this.post(APPLICATION.ERROR, [error]);
  }
}