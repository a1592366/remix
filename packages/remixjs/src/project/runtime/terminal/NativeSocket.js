import uuid from 'uuid';
import { API } from '../transports';

class NativeSocket {
  constructor (transport) {
    this.transport = transport;
  }

  connect (id, options, callback) {
    this.id = id;
    const socket = wx.connectSocket({
      ...options,
      complete: (res) => {
        callback(res);
      }
    });

    socket.onOpen(() => {
      this.transport.reply({
        type: API.SOCKET_OPEN,
        argv: [this.id]
      })
    });

    socket.onMessage((data) => {
      this.transport.reply({
        type: API.SOCKET_MESSAGE,
        argv: [this.id, data],
      })
    });

    socket.onClose(() => {
      this.transport.off(API.SOCKET_MESSAGE);
    });

    this.socket = socket

    this.transport.on(API.SOCKET_MESSAGE, this.onMessage);
  }

  onMessage = (id, message) => {
    if (id === this.id) {
      this.socket.send(message);
    }
  }
}

export default function createNativeSocket (transport, id, options, callback) {
  const socket = new NativeSocket(transport);

  return socket.connect(id, options, callback);
}