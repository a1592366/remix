import EventEmitter from 'events';
import uuid from 'uuid';


export default class extends EventEmitter {
  onMessage = ({ type, argv, callback }) => {
    if (type) {
      if (typeof callback === 'function') {
        argv.push(callback);
      }
  
      this.emit(type, ...argv);
    }
  }

  post (post) {
    const { type, body } = post;
    this.onMessage(body);
  }
};