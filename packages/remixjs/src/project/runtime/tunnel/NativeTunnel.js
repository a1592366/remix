import EventEmitter from 'events';
import uuid from 'uuid';
import { isFunction } from '../../../shared/is';


export default class extends EventEmitter {
  onMessage = ({ type, argv, callback }) => {
    if (type) {
      if (isFunction(callback)) {
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