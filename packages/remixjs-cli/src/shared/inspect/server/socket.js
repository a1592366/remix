
const { Type, APPLICATION } = require('remixjs-message-protocol');
const env = require('../../env');

const { getOwnPropertyNames: getNames } = Object;

const statusTypes = {
  WAITING_TO_CONNECT: 1,
  CONNECTED: 2,
  WAITING_TO_RECONNECT: 3
}

const connections = {};

class Socket {
  

  constructor (socket) {
    const { protocol } = socket;
    const [id, type] = protocol.split('+');

    this.id = id;
    this.type = Number(type);
    this.socket = socket;
    this.status = statusTypes.WAITING_TO_CONNECT;

    socket.on('message', (message) => {
      try {
        const json = JSON.parse(message);
        this.onMessage(json);
      } catch (e) {}
    });

    socket.on('close', () => {
      if (this.type === env.INSPECT_TERMINAL_TYPES.LOGIC) {

        if (this.tunnel) {
          this.tunnel.status = statusTypes.WAITING_TO_RECONNECT;
          this.tunnel.post({
            type: String(APPLICATION),
            body: {
              argv: [],
              callbackId: 'reLaunch'
            }
          });

          this.tunnel.tunnel = null;
          this.tunnel = null;
        }
      } else {
        delete connections[id];

        if (this.tunnel) {
          this.tunnel.post({
            type: String(APPLICATION),
            body: {
              argv: [],
              callbackId: 'disconnect'
            }
          })
  
          this.tunnel.tunnel = null;
          this.tunnel = null;
        }
      }
    });
  }

  post (post) {
    this.socket.send(JSON.stringify({
      post
    }));
  }

  defineInspecting (body) {
    const { callbackId } = body;

    connections[this.id] = {
      tunnel: this,
      body
    };
  }

  connect (body) {
    const { argv, callbackId } = body;
    const id = argv[0];
    
    const connection = connections[id];

    if (connection) {
      const { tunnel, body } = connection;

      if (
        tunnel.status === statusTypes.WAITING_TO_CONNECT ||
        tunnel.status === statusTypes.WAITING_TO_RECONNECT
      ) {

        this.tunnel = tunnel;
        tunnel.tunnel = this;

        tunnel.post({
          type: String(APPLICATION),
          body: {
            argv: [],
            callbackId: tunnel.status === statusTypes.WAITING_TO_CONNECT ? 
              body.callbackId : 'reConnect'
          }
        });

        return this.status = tunnel.status = statusTypes.CONNECTED;
      }
    }

    this.post({
      type: String(APPLICATION),
      body: {
        argv: ['NO_EXIST'],
        callbackId
      }
    });
  }

  onMessage (message) {  
    const { post } = message;
    const { body, type } = post;

    if (this.status === statusTypes.WAITING_TO_CONNECT) {
      if (type === String(APPLICATION)) {
        const t = body.type;
        const type = new Type(t.type, t.value);

        if (type === APPLICATION.INSPECT) {
          this.defineInspecting(body);
        } else {
          this.connect(body);
        }
      }
    } else if (this.status === statusTypes.CONNECTED) {
      this.tunnel.post(post);
    }
  }
}

module.exports = function (socket) {
  return new Socket(socket);
}

module.exports.getConnections = function () {
  return getNames(connections).map(function (id) {
    const connection = connections[id];
    return {
      id,
      status: connection.tunnel.status
    }
  })
}