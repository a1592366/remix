import uuid from 'uuid';
import transports, { API } from '../transports';
import env from '../../../../env';

export default class NativeRuntime {
  constructor () {
    transports.api.on(API.REQUEST, this.onRequest);
    transports.api.on(API.NAVIGATE_TO, this.onNavigateTo);
    transports.api.on(API.NAVIGATE_BACK, this.onNavigateBack);
  }

  onRequest (options, callback) {
    wx.request({
      ...options,
      complete (data) { callback(data) }
    });
  }

  onNavigateTo (options, callback) {
    wx.navigateTo({
      ...options,
      complete (data) { callback(data) }
    })
  }

  onNavigateBack (options, callback) {
    wx.navigateBack({
      ...options,
      complete (data) { callback(data) }
    })
  }
}