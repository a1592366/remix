const rpc = require('jayson');
const path = require('path');
const spawn = require('cross-spawn');
const env = require('../../../shared/env');

function getContext () {
  r.process = r.process || spawn('node', [path.resolve(__dirname, 'server.js')], {
    stdio: 'inherit',
    cwd: env.PROJ
  });
  
  r.client = r.client || rpc.client.http({
    port: env.REMIX_RPC_PORT
  }); 

  r.clientRequest = r.clientRequest || r.client.request ;
        
  r.client.request = function (method, ...argv) {
    return new Promise((resolve, reject) => {
      const request = () => {
        r.clientRequest.call(r.client, method, argv, (err, res) => {
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

  return r.client.request('context');
}

const r = module.exports = {
  process: null,
  getContext,
  exit () {
    this.process.exit();
  },
}
