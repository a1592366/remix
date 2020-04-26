import Emitter from 'tiny-emitter';

export default class extends Emitter {
  subscribe = (type, callback) => {
    this.on(types.join('.'), callback);
  }

  publish (data) {
    debugger;
  }
};