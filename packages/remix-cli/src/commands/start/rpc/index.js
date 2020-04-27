const { resolve } = require('path');
const rpc = require('jayson');
const spawn = require('cross-spawn');

const notify = require('../../../shared/notify');
const proj = require('../../../config/proj');
const env = require('../../../config/env');

const command = ['node', [resolve(__dirname, 'server.js')]];

module.exports = {
  process: null,
  exit () { this.process.exit(); },

  start () {
    return new Promise((resolve, reject) => {
      if (!exports.process) {
        const ps = spawn(...command, { stdio: 'inherit', cwd: proj.PROJ_DIR });
        exports.process = ps;

        ps.on('close', () => {
          notify.red(`[${env.RPC_PORT}] 端口已经被占用`);

          exports.hasExceptions = true;
        });

        exports.client = rpc.client.http({ port: env.RPC_PORT }); 
        exports.clientRequest = exports.client.request;

        exports.client.request = function (method, ...argv) {
          return new Promise((resolve, reject) => {
            const request = () => {
              exports.clientRequest.call(exports.client, method, argv, (error, res) => {
                if (error) {
                  if (error.code === 'ECONNREFUSED') {
                    process.nextTick(request)  ;
                  } else {
                    reject(error)
                  }
                } else {
                  resolve(res);
                }
              });
            }
        
            request();
          });
        }

        resolve();
      } else {
        resolve();
      }
    });
  },

  async context () {
    await this.start();
    return exports.client.request('context');
  }
}
