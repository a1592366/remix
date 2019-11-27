import uuid from 'uuid';
import Tunnel from '../tunnel';
import { APPLICATION } from './types';

export default class ApplicationTransport extends Tunnel {
  constructor () {
    super();

    this.on(APPLICATION, this.onMessage);
  }

  onDisconnect (callback) {
    this.on('disconnect', callback);
  }

  onLaunch (callback) {
    this.on(APPLICATION.LAUNCH, callback);
  }

  post = (type, argv, callback) => {
    const callbackId = typeof callback === 'function' ? uuid.v4() : null

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