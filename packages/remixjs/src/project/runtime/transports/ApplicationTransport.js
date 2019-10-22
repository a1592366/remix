import uuid from 'uuid';
import Tunnel from '../tunnel';
import { APPLICATION, Type } from './types';
import { isFunction } from '../../../shared/is';

export default class ApplicationTransport extends Tunnel {
  constructor () {
    super();

    this.on(APPLICATION, this.onMessage);
  }

  onMessage = ({ type, argv, callbackId }) => {
    if (callbackId) {
      this.emit(callbackId, ...argv);
    } else {
      const t = new Type(type.type, type.value);

      if (callbackId) {
        argv.push(function (...argv) {
          this.this.post({
            type: String(APPLICATION),
            body: {
              argv,
              type,
              callbackId
            }
          });
        })
      }

      this.emit(t, ...argv);
    }
  }

  onLaunch (callback) {
    this.on(APPLICATION.LAUNCH, callback);
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

  connect (id, callback) {
    this.post(APPLICATION.CONNECT, [id], callback);
  }

  inspect (callback) {
    this.post(APPLICATION.INSPECT, [], callback);
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