const argv = require('yargs').argv;
const path = require('path');
const internalIp  = require('internal-ip');

const INTERNAL_IP = internalIp.v4.sync() || '127.0.0.1';
const PROJ = process.cwd(); 


const PROJ_ENTRY_NAME = 'index.js';


const IS_INSPECT_MODE = !!argv.inspect;
const INSPECT_PORT = 10002;
const INSPECT_UI_URL = `http://${INTERNAL_IP}:${INSPECT_PORT}`;
const INSPECT_WS_URL = `ws://${INTERNAL_IP}:${INSPECT_PORT}`;

const INSEPCT_MESSAGE_TYPES = {
  REGISTER: 0,
  MESSAGE:1,
  CLOSE: 2
};

const INSPECT_TERMINAL_TYPES = {
  VIEW: 1,
  LOGIC: 2
}


const REMIX_NAME = '.~remix';
const REMIX_CONFIG_NAME = 'configrc';
const REMIX_RPC_PORT = 10001;
const REMIX_VIEW_SYMBOL = '.~';
const REMIX_BOOT_NAME = 'runtime/boot.js';
const REMIX_NODE_RUNTIME_NAME = 'runtime/node.runtime.js';
const REMIX_CLIENT_RUNTIME_NAME = 'runtime/client.runtime.js';
const REMIX_DEVTOOL_RUNTIME_NAME = 'runtime/devtool.runtime.js';




const PROJ_NAME = path.parse(PROJ).name;
const PROJ_BUILD = path.resolve(PROJ, 'dist');
const PROJ_SOURCE = path.resolve(PROJ, 'src');
const PROJ_ENTRY = path.resolve(PROJ_SOURCE, PROJ_ENTRY_NAME);

const REMIX_SOURCE = path.resolve(PROJ, REMIX_NAME);
const REMIX_CONFIG = path.resolve(REMIX_SOURCE, REMIX_CONFIG_NAME);
const REMIX_BOOT = path.resolve(REMIX_SOURCE, REMIX_BOOT_NAME);
const REMIX_NODE_RUNTIME = path.resolve(REMIX_SOURCE, REMIX_NODE_RUNTIME_NAME);
const REMIX_CLIENT_RUNTIME = path.resolve(REMIX_SOURCE, REMIX_CLIENT_RUNTIME_NAME);
const REMIX_DEVTOOL_RUNTIME = path.resolve(REMIX_SOURCE, REMIX_DEVTOOL_RUNTIME_NAME);

const PROJ_XML = path.resolve(REMIX_NAME, `.~xml/ui`);


module.exports = {
  INTERNAL_IP,

  REMIX_CONFIG,
  REMIX_NAME,
  REMIX_SOURCE,
  REMIX_RPC_PORT,
  REMIX_BOOT,
  REMIX_VIEW_SYMBOL,
  REMIX_NODE_RUNTIME,
  REMIX_CLIENT_RUNTIME,
  REMIX_DEVTOOL_RUNTIME,

  PROJ,
  PROJ_XML,
  PROJ_NAME,
  PROJ_BUILD,
  PROJ_ENTRY,
  PROJ_SOURCE,
  
  IS_INSPECT_MODE,
  INSPECT_PORT,
  INSPECT_WS_URL,
  INSPECT_UI_URL,
  INSEPCT_MESSAGE_TYPES,
  INSPECT_TERMINAL_TYPES
}