import uuid from 'uuid';

export class Type {
  constructor (type, value) {
    this.type = type;
    this.value = value;
    this.uuid = uuid.v4();
  }

  toString () {
    return this.type;
  }

  toValue () {
    return this.uuid;
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
  INSPECT: 'inspect',
  SHOW: 'show',
  HIDE: 'hide',
  ERROR: 'error'
});

export const VIEW = defineNotificationTypes('view', {
  LOAD: 'load',
});

export const API = defineNotificationTypes('api', {

})