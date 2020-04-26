import shortid from 'shortid';
import Tunnel from '../tunnel';
import App from './types/App';

export default class ApplicationTransport extends Tunnel {
  onDisconnect (callback) {
    this.on('disconnect', callback);
  }

  onLaunch (callback) {
    this.on(APPLICATION.LAUNCH, callback);
  }

  publish = (type, argv, callback) => {
    const callbackId = typeof callback === 'function' ? 
      shortid.generate() : null;

    if (callbackId) {
      this.once(callbackId, callback);
    }

    const payload = { type, argv, callbackId };

    super.publish({ type, payload });
  }

  reply (body) {
    super.post({
      type: String(APPLICATION),
      body
    })
  }

  connect (id, callback) {
    this.post(APPLICATION.CONNECT, [id], callback);
  }

  inspect (callback) {
    this.post(APPLICATION.INSPECT, [], callback);
  }

  launch (options) {
    debugger;
    this.publish(App.LAUNCH, [options]);
  }

  show () {
    this.post(APPLICATION.SHOW, []);
  }

  hide () {
    this.post(APPLICATION.HIDE, []);
  }

  error (error) {
    this.post(APPLICATION.ERROR, [error]);
  }
}