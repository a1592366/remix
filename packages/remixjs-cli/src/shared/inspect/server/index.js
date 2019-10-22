const WS = require('ws');
const qs = require('qs');
const fs = require('fs-extra');
const http = require('http');
const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const Router = require('koa-router');
const { Type, APPLICATION, COMMON } = require('remixjs-message-protocol');

const env = require('../../env');
const createSocket = require('./socket');
const { getConnections } = require('./socket');
const router = new Router();

class Server {
  start () {
    return new Promise((resolve, reject) => {
      const app = this.koa = new Koa();
      
      app.use(koaStatic(path.resolve(__dirname, '../ui')));
      app.use(koaStatic(path.resolve(env.REMIX_SOURCE, 'runtime')));
      app.use(router.routes());
      app.use(async context => {
        context.set('Content-Type', 'text/html; charset=utf-8');

        context.body = await fs.readFile(path.resolve(__dirname, '../ui/index.html'));
      })

      router.get('/api/env', async (context) => {
        context.body = env;
      });

      router.get('/api/inspect', async (context) => {
        context.body = getConnections()
      });
      
      const httpServer = app.listen(env.INSPECT_PORT, () => {
        resolve();
      });
  
      this.ws = new WS.Server({
        server: httpServer
      });
  
      this.ws.on('connection', createSocket);
    });
  }
}

module.exports = function () {
  const server = new Server;

  return server.start();
}

