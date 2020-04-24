
import gud from 'gud';
import EventEmitter from 'events';
import socket from './socket';
import worker from './worker';

const { level: { API, COMMON, BATCH }, types: messageTypes } = message;

const env = process.env.NODE_ENV;
const inWx = typeof wx === 'object' && wx.getSystemInfo;

class Runtime extends EventEmitter {
  static types = {
    SOCKET: 1,
    WORKER: 2,
    NULL: 0
  }

  static LIMITED = 5;

  constructor (options = {
    uri: 'workers/index.js',
    type: env === 'debugger' ? Worker.types.SOCKET : Worker.types.WORKER
  }) {
    super();
    this.options = options;
    this.messages = [];
    this.createWorker();
  }

  getCallbackId () {
    return `__callback_${gud()}__`
  }

  createWorker (callback) {
    const { uri, type } = this.options;

    this.worker = type === Worker.types.SOCKET ? 
      socket(uri, this.options, callback) : worker(uri, callback);

    this.registerEvents();

    this.worker.start();
  }

  registerEvents () {
    this.worker.on('message', ({ level, ...others }) => this.emit(level, others));
    this.worker.on('ready', () => this.emit('ready'));

    this.on(COMMON, ({ type, name, argv }) => {
      if (type === messageTypes.CALLBACK) {
        this.emit(name, ...argv);
      }
    });

    this.on(BATCH, ({ messages }) => {
      messages.forEach(message => {
        this.emit(message.level, message);
      });
    });
  }

  postMessage (data, callback) {
    if (this.worker) {
      if (typeof callback === 'function') {
        const callbackId = this.getCallbackId();
        data.callbackId = callbackId;
  
        this.once(callbackId, callback);
      }

      this.messages.push(data);

      if (inWx) {
        wx.nextTick(this.post);
      }
    }
  } 

  post = () => {
    if (this.worker) {
      if (this.messages.length > 0) {
        const messages = this.messages.splice(0, 15);

        if (messages.length === 1) {
          this.worker.postMessage(messages[0]);
        } else {
          this.worker.postMessage({
            level: message.level.BATCH,
            messages
          });
        }        

        if (this.messages.length > 0) {
          if (inWx) {
            wx.nextTick(this.post);
          }
        }
      }
    }
  }
}


export default Runtime;