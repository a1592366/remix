const path = require('path');
const internalIp  = require('internal-ip');

const INTERNAL_IP = internalIp.v4.sync() || '127.0.0.1';
const PROJ = process.cwd(); 


const REMIX_NAME = '.~remix';
const REMIX_CONFIG = 'configrc';
const PROJ_DIST = 'dist';

const PROJ_BUILD = path.resolve(PROJ, PROJ_DIST);


const REMIX_SOURCE = path.resolve(PROJ, REMIX_NAME);
const REMIX_CONFIG = path.resolve(REMIX_SOURCE, REMIX_CONFIG);


module.exports = {
  REMIX_CONFIG,
  REMIX_NAME,
  REMIX_SOURCE,

  PROJ,
  PROJ_BUILD
}