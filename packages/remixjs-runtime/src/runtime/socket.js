
import EventEmitter from 'events';
const inWx = typeof wx === 'object';

class Socket extends EventEmitter {
  static status = {
    READY: 'ready'
  }
  constructor (uri, options = {

  }) {
    super();
    this.uri = uri;
    this.options = options;
    this.messages = [];
  }

  start () {
    this.createWorker();
  }

  createWorker () {
    if (inWx) {
      this.socket = wx.connectSocket({
        url: this.uri,
        ...this.options,
      });

      this.socket.onMessage(this.onReady);
      this.socket.onClose(this.onClose);
    }
  }

  onClose = () => {
    this.isReady = false;
    this.socket.onMessage(this.onReady);
  }

  onReady = ({ data }) => {
    try {
      const json = JSON.parse(data);
      if (json.status === Socket.status.READY) {
        this.isReady = true;
        this.socket.onMessage(this.onMessage);

        this.messages.reverse().forEach(data => {
          this.socket.send({ data });
        });

        this.messages = [];

        this.emit('ready');
      }
    } catch (e) {
      this.onError(e);
    }
  }

  onMessage = ({ data }) => {
    try {
      const json = JSON.parse(data);
      this.emit('message', json);
    } catch (e) {
      this.onError(e);
    }
  }

  onError = (e) => {
    this.emit('error', e);
  }

  postMessage (message) {
    const data = this.stringify(message);
    
    if (this.isReady) {
      return this.socket.send({ data });
    }

    this.messages.push(data);
  }

  stringify (data) {
    if (typeof data === 'object') {
      return JSON.stringify(data);
    } 

    return data;
  }
}

export default function (uri, options, callback) {
  const socket = new Socket(uri, options);

  return socket;
}