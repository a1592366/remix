import EventEmitter from 'events';
import uuid from 'uuid';
import { Type } from 'remixjs-message-protocol';
import Socket from './Socket';
import env from '../../../../env';


class MessageEmitter extends EventEmitter {
  constructor () {
    super();

    const { isDevToolRuntime } = env;

    this.id = isDevToolRuntime ? env.inspectLogicUUID : env.inspectTerminalUUID;
    this.connected = false;
    this.queue = [];

    this.socket = new Socket({
      url: env.inspectWSURL,
      protocols: [
        this.id, 
        env.inspectTerminalTypes[env.isDevToolRuntime ? 'LOGIC' : 'VIEW']
      ]
    });

    this.socket.onMessage(({ data }) => {
      try {
        const json = JSON.parse(data);
        this.onMessage(json);
      } catch (err) {
        console.log(err)
      }
    });

    this.socket.onOpen(this.onOpen);
    this.socket.onClose(this.onClose);
    this.socket.onError(this.onError);
  }

  post = (post) => {
    if (this.connected) {
      this.socket.send({
        data: JSON.stringify({
          post
        })
      })
    } else {
      this.queue.push(post);
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
    this.emitter = SocketTunnel.emitter || (SocketTunnel.emitter = new MessageEmitter());

    this.emitter.on('message', ({ post }) => {
      const { type, body } = post;
      this.emit(type, body);
    });
  }

  onMessage = ({ type, argv, callbackId }) => {
    if (callbackId) {
      if (this.eventNames().includes(callbackId)) {
        return this.emit(callbackId, ...argv);
      }
    } 

    if (type) {
      const t = new Type(type.type, type.value);
  
      if (callbackId) {
        argv.push((...argv) => {
          this.reply({
            argv,
            type,
            callbackId
          });
        })
      }
  
      this.emit(t, ...argv);
    }
  }

  post (data) {
    this.emitter.post(data);
  }
}