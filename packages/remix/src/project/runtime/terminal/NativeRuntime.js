import uuid from 'uuid';
import transports, { API } from '../Support';
import env from '../../../../config';
import createNativeSocket from './NativeSocket';

export default class NativeRuntime {
  constructor () {
    debugger;
    transports.api.on(API.LOGIN, this.onLogin);
    transports.api.on(API.REQUEST, this.onRequest);
    transports.api.on(API.NAVIGATE_TO, this.onNavigateTo);
    transports.api.on(API.NAVIGATE_BACK, this.onNavigateBack);
    transports.api.on(API.CONNECT_SOCKET, this.onConnectSocket);
    transports.api.on(API.GET_STORAGE, this.onGetStorage);
    transports.api.on(API.SET_STORAGE, this.onSetStorage);
    transports.api.on(API.GET_STORAGE_INFO, this.onGetStorageInfo);
    transports.api.on(API.GET_STORAGE_INFO_SYNC, this.onGetStorageInfoSync);
    transports.api.on(API.GET_STORAGE_SYNC, this.onGetStorageSync);
    transports.api.on(API.SET_STORAGE_SYNC, this.onSetStorageSync);
    transports.api.on(API.REMOVE_STORAGE, this.onRemoveStorage);
    transports.api.on(API.CLEAaR_STORAGE, this.onClearStorage);
    transports.api.on(API.REMOVE_STORAGE_SYNC, this.onRemoveStorageSync);
    transports.api.on(API.CLEAaR_STORAGE_SYNC, this.onClearStorageSync);

    transports.api.on(API.SHOW_TABBAR, this.onShowTabBar);
    transports.api.on(API.HIDE_TABBAR, this.onHideabBar);
  }
  

  APIRequst (api, args) {
    const [options, callback] = args;
    return wx[api]({
      ...options,
      complete (res) { callback(res) }
    });
  }

  onShowTabBar = (...args) => { return this.APIRequst('showTabBar', args);}
  onHideabBar = (...args) => { return this.APIRequst('hideTabBar', args);}

  onRequest = (...args) => { return this.APIRequst('request', args);}
  onNavigateTo = (...args) => {return this.APIRequst('navigateTo', args)}
  onNavigateBack = (...args) => {return this.APIRequst('navigateBack', args);}

  onSetStorage = (...args) => { return this.APIRequst('setStorage', args); }
  onGetStorage = (...args) => { return this.APIRequst('getStorage', args); }
  onRemoveStorage = (...args) => { return this.APIRequst('removeStorage', args); }
  onClearStorage = (...args) => { return this.APIRequst('clearStorage', args); }
  onGetStorageInfo = (...args) => { 
    return this.APIRequst('getStorageInfo', args); 
  }
  onSetStorageSync = (...args) => { return wx.setStorageSync(...args); }
  onGetStorageSync = (...args) => { 
    const callback = args[args.length - 1];
    if (typeof callback === 'function') {
      callback(wx.getStorageSync(...args));
    }
  }
  onRemoveStorageSync = (...args) => { return wx.removeStorageSync(...args); }
  onClearStorageSync = (...args) => { return wx.clearStorageSync(...args); }
  onGetStorageInfoSync = (...args) => { 
    const callback = args[args.length - 1];
    if (typeof callback === 'function') {
      callback(wx.getStorageInfoSync(...args));
    }
  }

  onLogin = (options, callback) => {
    wx.login({
      ...options,
      complete (res) { callback(res) }
    })
  }

  onConnectSocket = (id, options, callback) => {
    return env.isInspectMode ? 
      createNativeSocket(transports.api, id, options, callback) : 
      this.APIRequst('connectSocket', options, callback);
  }
}