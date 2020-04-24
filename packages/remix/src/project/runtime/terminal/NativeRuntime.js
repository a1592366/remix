import uuid from 'uuid';
import { API, terminalTransports } from '../transports';
import env from '../../../../env';
import createNativeSocket from './NativeSocket';

const transports = terminalTransports;

export default class NativeRuntime {
  constructor () {
    transports.api.on(API.REQUEST, this.onRequest);
    transports.api.on(API.NAVIGATE_TO, this.onNavigateTo);
    transports.api.on(API.NAVIGATE_BACK, this.onNavigateBack);
    transports.api.on(API.CONNECT_SOCKET, this.onConnectSocket);
  }

  createCommonAPIRequst (api, options, callback) {
    return wx[api]({
      ...options,
      complete (res) { callback(res) }
    })
  }

  onRequest = (options, callback) => {
    return this.createCommonAPIRequst('request', options, callback);
  }

  onNavigateTo = (options, callback) => {
    return this.createCommonAPIRequst('navigateTo', options, callback);
  }

  onNavigateBack = (options, callback) => {
    return this.createCommonAPIRequst('onNavigateBack', options, callback);
  }

  onConnectSocket = (id, options, callback) => {
    return createNativeSocket(transports.api, id, options, callback);
  }
}