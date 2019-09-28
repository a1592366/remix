import { getApplication } from './application';
import message from '../message';

const { 
  level: { COMMON },
  types: { REQUEST_START, REQUEST_ABORT, CALLBACK, RESPONSE_BUFFER }, 
  status: { SUCCESS, ERROR } 
} = message;

class Request {
  static store (task) {
    const { id } = task;

    Request.store[id] = task;
  }

  static abort (id) {
    const task = Request.store[id];

    if (task) {
      task.abort();

    }

    Request.store[id] = null;
  }
  constructor (id, argv, callbackId) {
    this.options = argv[0];
    this.id = id;
    this.callbackId = callbackId;
    this.task = wx.request({
      ...this.options,
      complete: this.onComplete
    });
  }

  getStatus (message) {
    return /request:ok/g.test(message) ? SUCCESS : ERROR;
  }

  onComplete = (res) => {
    const { errMsg: error } = res;
    const status = this.getStatus(error);
    const argv = { status, data: res, error };

    if (this.options.responseType === RESPONSE_BUFFER) {
      const uint8 = new Uint8Array(res.data);
      res.data = String.fromCharCode.apply(null, uint8);
    }

    getApplication().worker.postMessage({
      level: COMMON,
      type: CALLBACK,
      callbackId: this.callbackId,
      argv: [argv]
    });
  }
}

export default function ({ id, callbackId, argv, name }) {
  switch (name) {
    case REQUEST_START:
      return new Request(id, argv, callbackId);
    case REQUEST_ABORT:
      Request.abort(id);
      break;
  }
}