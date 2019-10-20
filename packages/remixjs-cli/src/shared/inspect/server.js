const WS = require('ws');
const qs = require('qs');
const fs = require('fs-extra');
const http = require('http');
const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const Router = require('koa-router');

const env = require('../env');
const router = new Router();



class Server {
  constructor () {
    this.connections = {};
  }

  start () {
    return new Promise((resolve, reject) => {
      const app = this.koa = new Koa();
      
      app.use(koaStatic(path.resolve(__dirname, 'ui')));
      app.use(koaStatic(path.resolve(env.REMIX_SOURCE, 'runtime')));
      app.use(router.routes());
      app.use(async context => {
        context.set('Content-Type', 'text/html; charset=utf-8');

        context.body = await fs.readFile(path.resolve(__dirname, 'ui/index.html'));
      })

      router.get('/api/env', async (context) => {
        context.body = env;
      });

      router.get('/api/connections', async (context) => {
        context.body = Object.getOwnPropertyNames(this.connections).filter(id => id !== 'logic').map(id => {
          return id
        });
      });

      router.get('/api/insepct', async (context) => {

      });
      
      const httpServer = app.listen(env.INSPECT_PORT, () => {
        resolve();
      });
  
      this.ws = new WS.Server({
        server: httpServer
      });
  
      this.ws.on('connection', (socket) => {
        socket.on('message', (message) => {
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
        });
      });
    });
  }

  onRegister ({ id, terminal }, socket) {
    if (terminal === env.INSPECT_TERMINAL_TYPES.VIEW) {
      this.connections[id] = socket;
      socket.__connectionId__ = id;
    } else {
      if (this.connections.logic) {
        this.connections.logic.close();
        this.connections.logic.__connectionId__ = null;
      }

      this.connections.logic = socket;
      socket.__connectionId__ = 'logic';
    }
  }

  onMessage ({ id, data }) {
    
  }
}

module.exports = function () {
  const server = new Server;

  return server.start();
}
