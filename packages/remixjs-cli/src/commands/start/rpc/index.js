const rpc = require('jayson');
const path = require('path');
const spawn = require('cross-spawn');
const env = require('../../../shared/env');

const childProcess = spawn('node', [path.resolve(__dirname, 'server.js')], {
  stdio: 'inherit',
  cwd: env.PROJ
});

const client = rpc.client.http({
  port: env.REMIX_RPC_PORT
}); 

const clientRequest = client.request;
    
client.request = function (method, ...argv) {
  

  return new Promise((resolve, reject) => {
    const request = () => {
      clientRequest.call(client, method, argv, (err, res) => {
        if (err) {
          if (err.code === 'ECONNREFUSED') {
            return process.nextTick(request)  
          }

          return reject(err);
        } 
  
        resolve(res);
      })
    }

    request();
  });
}

function getContext () {
  return client.request('context');
}

module.exports = {
  process: childProcess,
  getContext
}
