const ipc = require('node-ipc');


module.exports = function () {
  return new Promise((resolve, reject) => {
    ipc.config.id = 'remixjs-start';

    ipc.serve(() => {

    });
    
    ipc.server.on('error', () => {
    
    });
    
    ipc.server.start();

    resolve();
  })
}