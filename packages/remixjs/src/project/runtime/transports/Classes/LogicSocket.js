import uuid from 'uuid';
import EventEmitter from 'events';
import { API } from '../types';

class LogicSocket extends EventEmitter {
  constructor (transport) {
    super();

    this.id = uuid.v4();
    this.transport = transport;
  }
 
  connect (options) {
    this.transport.post(
      API.CONNECT_SOCKET, 
      [this.id, options],
      () => {
        
      }
    );

    this.transport.on(API.SOCKET_OPEN, this.onSocketOpen);
    this.transport.on(API.SOCKET_MESSAGE, this.onSocketMessage);
  }

  onSocketOpen = (id) => {
    if (this.id === id) {
      this.emit('open');
    }
  }

  onSocketMessage = (id, data) => {
    if (id === this.id) {
      this.emit('message', data);
    }
  }

  onOpen (onOpen) {
    this.on('open', onOpen);
  }

  onMessage (onMessage) {
    this.on('message', onMessage);
  }

  send (data) {
    this.transport.reply({
      type: API.SOCKET_MESSAGE,
      argv: [this.id, data]
    });
  }
}

export default function createLogicSocket (transport, options) {
  const socket = new LogicSocket(transport);

  socket.connect(options);

  return socket;
}