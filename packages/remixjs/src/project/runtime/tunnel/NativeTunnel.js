import EventEmitter from 'events';

export default class extends EventEmitter {
  emit (type, argv) {
    super.emit(type, type, argv);
  }
};