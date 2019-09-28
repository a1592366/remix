import EventEmitter from 'events';
import { message } from '@expri/worker';
import gud from 'gud';

const {
  level: { APPLICATION, PAGE, COMMON, BATCH },
  types: { CALLBACK }
} = message;

class Worker extends EventEmitter {
  constructor () {
    super();

    this.messages = [];
    this.worker = worker;
    this.worker.onMessage(this.onMessage);


    this.on(COMMON, ({ type, callbackId, argv }) => {
      if (type === CALLBACK) {
        this.emit(callbackId, ...argv);
      }
    });

    this.on(BATCH, ({ messages }) => {
      messages.forEach(message => {
        this.emit(message.level, message);
      });
    });
  }

  getCallbackId () {
    return `__callback_${gud()}__`;
  }

  onMessage = (data) => {
    console.log(`client == receive ==> worker`, data);

    try {
      const json = JSON.parse(data.msg);
      this.emit(json.level, json);
    } catch (e) {
      this.onError(e);
    }
  }

  onError = (e) => {
    this.emit('error', e);
  }

  postMessage (data, callback) {
    if (typeof callback === 'function') {
      const callbackId = this.getCallbackId();
      data.callbackId = callbackId;

      this.once(callbackId, callback);
    }

    this.worker.postMessage(data);
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


export function getWorker () {
  return Worker.worker || (Worker.worker = new Worker());
} 