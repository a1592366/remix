import uuid from 'uuid';

export class Type {
  static types = {};

  constructor (type, value) {
    if (Type.types[value]) {
      return Type.types[value];
    }

    Type.types[value] = this;

    this.type = type;
    this.value = value;
    this.uuid = uuid.v4();
  }

  toString () {
    return this.value;
  }
}

const { getOwnPropertyNames: getNames } = Object;
const defineNotificationTypes = (prefix, types) => {
  const names = getNames(types);
  const t = {
    toString () {
      return prefix;
    }
  };

  names.forEach(name => {
    t[name] = new Type(prefix, `${prefix}.${types[name]}`);
  });

  return t;
}

export const APPLICATION = defineNotificationTypes('application', {
  LAUNCH: 'launch',
  CONNECT: 'connect',
  INSPECT: 'inspect',
  SHOW: 'show',
  HIDE: 'hide',
  ERROR: 'error'
});

export const VIEW = defineNotificationTypes('view', {
  LOAD: 'load',
  READY: 'ready',
  SHOW: 'show',
  HIDE: 'hide',
  EVENT: 'event',
  LIFECYCLE: 'lifecycle'
});

export const API = defineNotificationTypes('api', {
  LOGIN: 'login',
  REQUEST: 'request',
  NAVIGATE_TO: 'navigateTo',
  NAVIGATE_BACK: 'navigateBack',
  // storage
  GET_STORAGE: 'getStorage',
  GET_STORAGE_SYNC: 'getStorageSync',
  SET_STORAGE: 'setStorage',
  SET_STORAGE_SYNC: 'setStorageSync',
  GET_STORAGE_INFO: 'getStorageInfo',
  GET_STORAGE_INFO_SYNC: 'getStorageInfoSync',
  REMOVE_STORAGE: 'removeStorage',
  REMOVE_STORAGE_SYNC: 'removeStorageSync',
  CLEAR_STORAGE: 'clearStorage',
  CLEAR_STORAGE_SYNC: 'clearStorageSync',

  // socket
  CONNECT_SOCKET: 'connectSocket',
  SOCKET_OPEN: 'socketOpen',
  SOCKET_MESSAGE: 'socketMessage',

  // ui
  SHOW_TABBAR: 'showTabBar',
  HIDE_TABBAR: 'hideTabBar'
});

export const COMMON = defineNotificationTypes('common', {
  CALLBACK: 'callback'
})