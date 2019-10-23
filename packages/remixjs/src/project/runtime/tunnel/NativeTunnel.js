import EventEmitter from 'events';
import uuid from 'uuid'

class MessageEmitter extends EventEmitter {
  constructor () {
    super();

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

    this.emitter.on('message', this.onMessage);
  }

  onMessage = ({ post }) => {
    const { type, body } = post;
    this.emit(type, body);
  }

  post (data) {
    this.emitter.post(data);
  }
};