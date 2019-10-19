const WS = require('ws');
const qs = require('qs');
const http = require('http');
const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');

const env = require('../env');

class Server {
  constructor () {
    this.connections = {};

    this.createServer();
  }

  createServer () {
    const app = this.koa = new Koa();

    app.use(koaStatic(path.resolve(__dirname, 'ui')));

    const httpServer = app.listen(env.INSPECT_PORT, () => {
      process.send({
        status: 'ready'
      });
    });

    this.ws = new WS.Server({
      server: httpServer
    });

    this.ws.on('connection', (socket) => {
      socket.on('message', () => {
        try {
          const json = JSON.parse(message);
    
          switch (json.type) {
            case env.INSEPCT_MESSAGE_TYPES.REGISTER: {
              this.onRegister(json, socket);
              break;
            }
    
            case env.INSEPCT_MESSAGE_TYPES.MESSAGE: {
              this.onMessage(json);
              break;
            }
    
            case env.INSEPCT_MESSAGE_TYPES.CLOSE: {
    
            }
    
          }
        } catch (e) {}
      });

      socket.on('close', () => {
        this.connections[socket.__connectionId__] = null;

        socket.__connectionId__ = null;
      })
    });
  }

  onRegister ({ id }, socket) {
    this.connections[id] = socket;

    socket.__connectionId__ = id;
  }

  onMessage ({ id, data }) {
    
  }
}

module.exports = new Server;
