import EventEmitter from 'events';
import uuid from 'uuid';
import Socket from '../Socket';
import env from '../../../../env';

export default class extends EventEmitter {
  constructor () {
    super();

    this.id = uuid.v4();
    this.opened = false;
    this.messageQueue = [];

    this.createSocket();
  }
  
  createSocket () {
    this.socket = new Socket({
      url: env.inspectWSURL,
      protocol: this.id
    });

    this.socket.onMessage(this.onMessage);
    this.socket.onOpen(this.onOpen);
    this.socket.onClose(this.onClose);
    this.socket.onError(this.onError);
  }

  post = (data) => {
    if (this.opened) {
      this.socket.send({
        data: JSON.stringify({
          id: this.id,
          terminal: env.inspectTerminalTypes.VIEW,
          ...data
        })
      })
    } else {
      this.messageQueue.push(data);
    }
  }

  onError = ({ errMsg }) => {
    if (errMsg === 'url not in domain list') {
      wx.hideLoading();

      wx.showModal({
        title: '错误',
        content: '请去掉域名校验，否则无法调试真机',
        showCancel: false
      }) 
    }
  }

  onOpen = () => {
    this.opened = true;

    if (this.messageQueue.length > 0) {
      let message;
      while (message = this.messageQueue.shift()) {
        this.post(message)
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