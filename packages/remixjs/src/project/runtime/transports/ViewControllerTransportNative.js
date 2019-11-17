import uuid from 'uuid';
import Tunnel from '../tunnel';
import { VIEW } from './types';
import { isFunction } from '../../../shared/is';
import { document } from '../../../document'

export default class ViewControllerTransportNative  extends Tunnel {
  constructor () {
    super();
  }

  dispatch (type, id, parentId, e) {
    if (id) {
      this.post(VIEW.EVENT, [type, id, parentId, e]);
    }
  }

  callLifecycle (type, id, parentId, view) {
    if (id) {
      this.post(VIEW.LIFECYCLE, [type, id, parentId, view]);
    }
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

  shareMessage (options) {
    this.post(VIEW.LOAD, [options]);
  }

  onShareMessage (callback) {
    this.on(VIEW.SHARE_MESSAGE, callback);
  }

  onLoad (callback) {
    this.on(VIEW.LOAD, callback);
  }

  onReady (callback) {
    this.on(VIEW.READY, callback);
  }

  onDispatch (callback) {
    this.on(VIEW.EVENT, callback);
  }

  onLifecycle (callback) {
    this.on(VIEW.LIFECYCLE, callback);
  }
}