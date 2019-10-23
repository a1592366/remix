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
      if (this.eventNames().includes(callbackId)) {
        return this.emit(callbackId, ...argv);
      }
    } 

    if (type) {
      const t = new Type(type.type, type.value);
  
      if (callbackId) {
        argv.push(function (...argv) {
          this.reply({
            argv,
            type,
            callbackId
          });
        })
      }
  
      this.emit(t, ...argv);
    }
    
  }

  onDisconnect (callback) {
    this.on('disconnect', callback);
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

  reply (body) {
    super.post({
      type: String(APPLICATION),
      body
    })
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