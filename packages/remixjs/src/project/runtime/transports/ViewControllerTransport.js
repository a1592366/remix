import uuid from 'uuid';
import Tunnel from '../tunnel';
import { VIEW, Type } from './types';
import { isFunction } from '../../../shared/is';

export default class ViewControllerTransport  extends Tunnel {
  constructor () {
    super();

    this.on(VIEW, this.onMessage);
  }

  onMessage = ({ type, argv, callbackId }) => {
    if (callbackId) {
      if (this.eventNames().includes(callbackId)) {
        return this.emit(callbackId, ...argv);
      }
    } 
    
    const t = new Type(type.type, type.value);

    if (callbackId) {
      argv.push(function (...argv) {
        this.post({
          type: String(VIEW),
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