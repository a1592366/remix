import uuid from 'uuid';

class Type {
  constructor (value) {
    this.value = value;
    this.uuid = uuid.v4();
  }

  toString () {
    return this.value;
  }

  toValue () {
    return this.uuid;
  }
}

const { getOwnPropertyNames: getNames } = Object;
const defineNotificationTypes = (types) => {
  const names = getNames(types);
  const t = {};
  names.forEach(name => {
    t[name] = new Type(types[name]);
  });

  return t;
}

export const APPLICATION = defineNotificationTypes({
  LAUNCH: 'application.launch',
  SHOW: 'application.show',
  HIDE: 'application.hide',
  ERROR: 'application.error'
});

export const VIEW = defineNotificationTypes({
  LOAD: 'view.load',
});