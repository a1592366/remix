import EventEmitter from 'events';
import uuid from 'uuid';
import env from '../../../../env';

class MessageEmitter extends EventEmitter {
  constructor () {
    super();

    console.log(env);

    this.id = uuid.v4();
  }

  post (post) {
    this.onMessage({
      post
    });
  }

  onMessage = (data) => {
    this.emit('message', data);
  }
}

export default class extends EventEmitter {
  constructor () {
    super();

    this.id = uuid.v4();
    this.emitter = EventEmitter.emitter || (EventEmitter.emitter = new MessageEmitter());

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
      if (callbackId) {
        argv.push((...argv) => {
          this.reply({
            argv,
            type,
            callbackId
          });
        })
      }
  
      this.emit(type, ...argv);
    }
  }

  post (data) {
    this.emitter.post(data);
  }
};