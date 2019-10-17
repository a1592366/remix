const path = require('path');
const internalIp  = require('internal-ip');

const INTERNAL_IP = internalIp.v4.sync() || '127.0.0.1';
const PROJ = process.cwd(); 


const PROJ_ENTRY_NAME = 'index.js';

const REMIX_NAME = '.~remix';
const REMIX_CONFIG_NAME = 'configrc';
const REMIX_RPC_PORT = 10001;
const REMIX_VIEW_SYMBOL = '.~';
const REMIX_BOOT_NAME = 'runtime/boot.js';
const REMIX_NODE_RUNTIME_NAME = 'runtime/node.runtime.js';


const PROJ_NAME = path.parse(PROJ).name;
const PROJ_BUILD = path.resolve(PROJ, 'dist');
const PROJ_SOURCE = path.resolve(PROJ, 'src');
const PROJ_ENTRY = path.resolve(PROJ_SOURCE, PROJ_ENTRY_NAME);

const REMIX_SOURCE = path.resolve(PROJ, REMIX_NAME);
const REMIX_CONFIG = path.resolve(REMIX_SOURCE, REMIX_CONFIG_NAME);
const REMIX_BOOT = path.resolve(REMIX_SOURCE, REMIX_BOOT_NAME);
const REMIX_NODE_RUNTIME = path.resolve(REMIX_SOURCE, REMIX_NODE_RUNTIME_NAME);

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

  PROJ,
  PROJ_XML,
  PROJ_NAME,
  PROJ_BUILD,
  PROJ_ENTRY,
  PROJ_SOURCE
}