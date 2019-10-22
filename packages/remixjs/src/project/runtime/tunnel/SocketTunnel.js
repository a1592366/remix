import EventEmitter from 'events';
import uuid from 'uuid';
import Socket from '../Socket';
import env from '../../../../env';
import { isFunction } from '../../../shared/is';


class MessageEmitter extends EventEmitter {
  constructor () {
    super();

    this.id = uuid.v4();
    this.connected = false;
    this.queue = [];

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
    if (this.connected) {
      this.socket.send({
        data:  JSON.stringify({
          id: this.id,
          type: env.inspectMessageTypes.MESSAGE,
          terminal: env.inspectTerminalTypes[env.isDevToolRunTime ? 'LOGIC' : 'VIEW'],
          post: {
            ...data
          }
        })
      })
    } else {
      this.queue.push(data);
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
    this.connected = true;

    if (this.queue.length > 0) {
      let message;
      while (message = this.queue.shift()) {
        this.post(message)
      }

      this.queue = [];
    }

    this.post({
      type: env.inspectMessageTypes.REGISTER,
    });
  }

  onClose = () => {
    this.connected = false;
  }

  onMessage = (data) => {
    this.emit('message', data);
  }
}


export default class SocketTunnel extends EventEmitter {
  constructor () {
    super();

    this.id = uuid.v4();
    this.emitter = SocketTunnel.emitter || (SocketTunnel.emitter = new MessageEmitter())

    this.emitter.on('message', this.onMessage);
  }

  onMessage = ({ id, post, type }) => {
    const { type: t, body } = post;

    this.emit(t, id, type, body);
  }

  post (data) {
    this.emitter.post(data);
  }
}