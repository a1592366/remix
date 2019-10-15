const ipc = require('node-ipc');

function createServer () {
  return new Promise((resolve, reject) => {
    ipc.config.id = 'server';
    ipc.config.retry = 1500;
    ipc.config.maxConnections = 1;

    ipc.serve(() => {
      ipc.server.on('connect', () => {
      });
    });
    
    ipc.server.on('error', err => {
      reject(err);
    });
    
    ipc.server.start();
  });
}




module.exports = {
  async createIPC () {
    await createServer();
  
    return new Promise((resolve, reject) => {
      ipc.config.id = 'client';
      ipc.config.retry = 1500;
  
      ipc.connectTo('server', () => {
        ipc.of.server.on('connect', () => {
          resolve(ipc.of.server);
        });
      })
    })
  }
}
