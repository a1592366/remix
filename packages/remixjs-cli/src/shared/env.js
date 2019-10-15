const path = require('path');
const internalIp  = require('internal-ip');

const INTERNAL_IP = internalIp.v4.sync() || '127.0.0.1';
const PROJ = process.cwd(); 


const PROJ_ENTRY_NAME = 'index.js';

const REMIX_NAME = '.~remix';
const REMIX_CONFIG_NAME = 'configrc';
const REMIX_RPC_PORT = 10001;
const REMIX_WRAPPER_NAME = 'wrapper';
const REMIX_BOOT_NAME = 'boot.js';


const PROJ_NAME = path.parse(PROJ).name;
const PROJ_BUILD = path.resolve(PROJ, 'dist');
const PROJ_SOURCE = path.resolve(PROJ, 'src');
const PROJ_ENTRY = path.resolve(PROJ_SOURCE, PROJ_ENTRY_NAME);

const REMIX_SOURCE = path.resolve(PROJ, REMIX_NAME);
const REMIX_CONFIG = path.resolve(REMIX_SOURCE, REMIX_CONFIG_NAME);
const REMIX_WRAPPER = path.resolve(REMIX_SOURCE, REMIX_WRAPPER_NAME);
const REMIX_BOOT = path.resolve(REMIX_SOURCE, REMIX_BOOT_NAME);

const PROJ_XML = path.resolve(REMIX_NAME, `.~xml/ui`);


module.exports = {
  INTERNAL_IP,

  REMIX_CONFIG,
  REMIX_NAME,
  REMIX_SOURCE,
  REMIX_RPC_PORT,
  REMIX_WRAPPER,
  REMIX_BOOT,

  PROJ,
  PROJ_XML,
  PROJ_NAME,
  PROJ_BUILD,
}