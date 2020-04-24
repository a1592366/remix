const { resolve } = require('path');
const rpc = require('jayson');
const spawn = require('cross-spawn');

const proj = require('../../../config/proj');
const env = require('../../../config/env');

const command = ['node', [resolve(__dirname, 'server.js')]];

const r = module.exports = {
  process: null,
  exit () { this.process.exit(); },
  context () {
    r.process = r.process || spawn(...command, {
        stdio: 'inherit',
        cwd: proj.PROJ_DIR
      });
    
    r.client = r.client || rpc.client.http({
      port: env.RPC_PORT
    }); 
  
    r.clientRequest = r.clientRequest || r.client.request ;
          
    r.client.request = function (method, ...argv) {
      return new Promise((resolve, reject) => {
        const request = () => {
          r.clientRequest.call(
            r.client,
             method, 
             argv, 
             (err, res) => {
              if (err) {
                if (err.code === 'ECONNREFUSED') {
                  process.nextTick(request)  
                } else {
                  reject(err)
                }
              } else {
                resolve(res);
              }
            }
          )
        }
    
        request();
      });
    }
  
    return r.client.request('context');
  }
}
