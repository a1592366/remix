import EventEmitter from 'events';

class Tunnel extends EventEmitter {
  emit (type, argv) {
    super.emit(type, type, argv);
  }
}

export default Tunnel;