import EventEmitter from 'events';

let Tunnel

if (process.env.NODE_ENV === 'development') {
  Tunnel = class extends EventEmitter {
    emit (type, argv) {
      super.emit(type, type, argv);
    }
  }
} else {
  Tunnel = class {
    constructor () {
      // wx.crea
    }    

    emit (type, argv) {

    }
  }
}



export default class extends EventEmitter {
  emit (type, argv) {
    super.emit(type, type, argv);
  }
};