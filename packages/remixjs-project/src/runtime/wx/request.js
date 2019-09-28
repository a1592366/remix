

import { message } from '@expri/worker';
import gud from 'gud';
import { getWorker } from '../worker';

const { level: { API, REQUEST }, status: { SUCCESS, ERROR }, types } = message;
const noop = () => {}

const callResponseMethods = (options = {}, name) => {
  const method = options[name];

  return method || noop;
};

const getRequestId = () => {
  return `__request_id_${gud()}__`;
}

const toArrayBuffer = (string) => {
  const length = string.length;
  const uint = new Uint8Array(string.length);

	for(let i = 0; i < length; i++) {
		uint[i] = string.charCodeAt(i);
	}
	return uint.buffer;
}

export function request (options = {}) {
  const id = getRequestId();

  const promise = new Promise((resolve, reject) => {
    getWorker().postMessage({
      level: REQUEST,
      name: types.REQUEST_START,
      argv: [options],
      id
    }, ({ status, data, error }) => {
      const { responseType } = options;

      if (responseType === types.RESPONSE_BUFFER) {
        data.data = toArrayBuffer(data.data);
      }

      if (status === SUCCESS) {
        callResponseMethods(options, 'success')(data);
        resolve(data);
      } else if (status === ERROR) {
        callResponseMethods(options, 'fail')(data);
        reject(error);
      }

      callResponseMethods(options, 'complete')(data);
    });
  });

  promise.abort = function () {
    getWorker().postMessage({
      level: REQUEST,
      name: types.REQUEST_ABORT,
      requestId
    });
  }
}