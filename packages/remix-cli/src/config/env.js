const uuid = require('uuid');
const internalIP = require('internal-ip');

const env = process.env;

const IP = internalIP.v4.sync() || '127.0.0.1';
const RPC_PORT = 4001;

const INSPECTOR = {
  MODE: '',
  URL: '',
  WS: '',
  TERMINAL_UUID: uuid.v4(),
  LOGIC_UUID: uuid.v4()
}

module.exports = {
  ...env,
  NPM_REGISTRY: env.NPM_REGISTRY ? 
    `--registry=${env.NPM_REGISTRY}` : null,
  IP,
  RPC_PORT,
  INSPECTOR
}