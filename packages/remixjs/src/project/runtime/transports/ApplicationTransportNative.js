import uuid from 'uuid';
import Tunnel from '../tunnel';
import { APPLICATION } from './types';

export default class ApplicationTransportNative extends Tunnel {
  constructor () {
    super();
  }

  onLaunch (callback) {
    this.on(APPLICATION.LAUNCH, callback);
  }

  post = (type, argv, callback) => {
    super.post({
      type: String(APPLICATION),
      body: {
        type,
        argv,
        callback
      }
    });
  }

  reply (body) {
    super.post({
      type: String(APPLICATION),
      body
    })
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