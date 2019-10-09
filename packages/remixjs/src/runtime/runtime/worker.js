
import EventEmitter from 'events';
const inWx = typeof wx === 'object';

class Worker extends EventEmitter {
  constructor (uri) {
    super();
    this.uri = uri;
  }

  start () {
    this.createWorker();
  }

  createWorker () {
    if (inWx) {      
      this.worker = wx.createWorker(this.uri);

      this.worker.onMessage((res) => {
        console.log(`worker == receive ==> client`, res);
        try {
          
          const json = typeof res === 'string' ? JSON.parse(res) : res;
          this.onMessage(json);
        } catch (e) {
          this.onError(e);
        }
      });

      this.emit('ready');
    }
  }

  onMessage = (json) => {
    this.emit('message', json);
  }

  onError = (e) => {
    this.emit('error', e);
  }

  postMessage (message) {
    console.log(`client == send ==> worker`, message);

    this.worker.postMessage({
      msg: this.stringify(message),
    });
  }

  stringify (data) {
    if (typeof data === 'object') {
      return JSON.stringify(data);
    } 

    return data;
  }
}

export default function (uri) {
  const worker = new Worker(uri);

  return worker;
}