import EventEmitter from 'events';
import uuid from 'uuid';
import Socket from '../Socket';
import env from '../../../../env';
import { isFunction } from '../../../shared/is';

export default class SocketTunnel extends EventEmitter {
  constructor () {
    super();

    this.id = uuid.v4();
    this.opened = false;
    this.messageQueue = [];

    this.createSocket();
  }
  
  createSocket () {
    SocketTunnel

    this.socket = new Socket({
      url: env.inspectWSURL,
      protocol: this.id
    });

    this.socket.onMessage(({ data }) => {
      try {
        const json = JSON.parse(data);
        this.onMessage(json);
      } catch (err) {}
    });
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

  onMessage = ({ type, data }) => {
    if (data.callbackId) {
      this.emit(data.callbackId, ...data.argv);
    }
  }

  emit (type, argv) {
    const callback = argv[argv.length - 1];
    const data = {
      type,
      argv
    }

    if (isFunction(callback)) {
      data.callbackId = uuid.v4();

      this.addListener(data.callbackId, (...argv) => {
        callback(...argv);

        this.removeListener(data.callbackId);
      });
    }

    this.post({
      type: env.inspectMessageTypes.MESSAGE,
      data
    });
  }
}