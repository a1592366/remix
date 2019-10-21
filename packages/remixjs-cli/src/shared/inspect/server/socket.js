
const { Type, APPLICATION } = require('remixjs-mesaage-protocol');
const env = require('../../env');
const applicationMessage = require('./applicationMessage');

class Socket {
  constructor (socket) {
    this.id = null;
    this.socket = socket;

    socket.on('message', (message) => {
      try {
        const json = JSON.parse(message);
  
        switch (json.type) {
          case env.INSEPCT_MESSAGE_TYPES.REGISTER: {
            this.onRegister(json, this);
            break;
          }
  
          case env.INSEPCT_MESSAGE_TYPES.MESSAGE: {
            this.onMessage(json, this);
            break;
          }
  
          case env.INSEPCT_MESSAGE_TYPES.CLOSE: {
  
          }
  
        }
      } catch (e) {
        debugger;
      }
    });
    socket.on('close', () => {
      socket.off('message');
      socket.off()
      applicationMessage.clear(this.id);
    });
  }

  post (data) {
    this.socket.send({
      id: this.id,
      terminal: env.inspectTerminalTypes.SERVICES,
      post: {
        ...data
      }
    })
  }

  onRegister ({ id, terminal }, socket) {
    switch (terminal) {
      case env.INSPECT_TERMINAL_TYPES.VIEW: {      
        this.id = id;
        break;
      }

      case env.INSPECT_TERMINAL_TYPES.LOGIC: {
        break;
      }
    }
  }

  onMessage (message, socket) {  
    const { id ,post, terminal } = message;
    const { body, type } = post;

    switch (type) {
      case String(APPLICATION): {
        applicationMessage(id, body, terminal, socket);
        break;
      }
    }
  }
}

module.exports = function (socket) {
  return new Socket(socket);
}