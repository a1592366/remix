import uuid from 'uuid';
import Tunnel from '../tunnel';
import { VIEW } from './types';
import { isFunction } from '../../../shared/is';

export default class ViewControllerTransport  extends Tunnel {
  constructor () {
    super();

    this.on(VIEW, this.onMessage);
  }

  dispatch (type, id, parentId, e) {
    if (id) {
      this.post(VIEW.EVENT, [type, id, parentId, e]);
    }
  }

  callLifecycle (type, id, parentId, view) {
    if (id) {
      this.post(VIEW.LIFECYCLE, [type, id, parentId, {
        __wxExparserNodeId__: view.__wxExparserNodeId__,
        __wxWebviewId__: view.__wxWebviewId__,
        data: view.data,
      }]);
    }
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

  onDispatch (callback) {
    this.on(VIEW.EVENT, callback);
  }

  onLifecycle (callback) {
    this.on(VIEW.LIFECYCLE, callback);
  }
}