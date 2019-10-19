import EventEmitter from 'events';
import uuid from 'uuid';
import * as env from '../../../../env';

export default class extends EventEmitter {
  constructor () {
    super();

    this.createSocket();
    this.id = uuid.v4();
    this.opened = false;

    this.messageQueue = [];
  }
  
  createSocket () {
    this.socket = wx.connectSocket({
      url: env.inspectWSURL,
      protocol: this.id
    });

    this.socket.onMessage(this.onMessage);
    this.socket.onOpen(this.onOpen);
    this.socket.onClose(this.onClose);
  }

  post = (data) => {
    if (this.opened) {
      this.socket.send({
        data: JSON.stringify({
          id: this.id,
          ...data
        })
      })
    } else {
      this.messageQueue.push(data);
    }
  }

  onOpen = () => {
    this.opened = true;

    if (this.messageQueue.length > 0) {
      let message;
      while (message = this.messageQueue.shift()) {
        this.post(data)
      }

      this.messageQueue = [];
    }

    this.post({
      type: env.inspectMessageTypes.REGISTER,
    });
  }

  onClose = () => {
    this.opened = false;
  }

  onMessage = () => {
    debugger;
  }

  emit (type, argv) {
    this.post({
      type: env.inspectMessageTypes.MESSAGE,
      data: {
        type,
        argv
      }
    });
  }
}