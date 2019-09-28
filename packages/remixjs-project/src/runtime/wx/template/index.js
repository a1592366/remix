
import { message } from '@expri/worker';
import { getWorker } from '../../worker';
import templateTypes from './types';

const { 
  level: { API, REQUEST }, 
  status: { SUCCESS, ERROR }, 
  types 
} = message;
const noop = function () {};
const callResponseMethods = (options = {}, name) => options[name] || noop;


export function argumentsTemplate (name) {
  return function (...argv) {
    return new Promise((resolve, reject) => {
      const options = { level: API, name, argv, type: templateTypes.ARGUMENTS };

      getWorker().postMessage(options, (res) => {
        resolve(res);
      });
    });
  }
}

export function callbackTemplate (name) {
  return function (callback = noop) {
    return new Promise((resolve, reject) => {
      const options = { level: API, name, argv: [], type: templateTypes.CALLBACK };

      getWorker().postMessage(options, (res) => {
        resolve(res);

        callback(res);
      });
    });
  }
}

export function optionsTemplate (name) {
  return function (options = {}) {
    return new Promise((resolve, reject) => {
      getWorker().postMessage({
        level: API,
        name,
        argv: [options],
        type: templateTypes.OPTIONS
      }, ({ status, data, error }) => {
        if (status === SUCCESS) {
          callResponseMethods(options, 'success')(data);
          resolve(data);
        } else if (status === ERROR) {
          callResponseMethods(options, 'fail')(data);
          reject(error);
        }
  
        callResponseMethods(options, 'complete')(data);
      })
    });
  }
}

