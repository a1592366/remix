const path = require('path');
const internalIp  = require('internal-ip');

const INTERNAL_IP = internalIp.v4.sync() || '127.0.0.1';
const PROJ = process.cwd(); 


const REMIX_NAME = '.~remix';
const REMIX_CONFIG_NAME = 'configrc';

const PROJ_NAME = path.parse(PROJ).name;
const PROJ_BUILD = path.resolve(PROJ, 'dist');

const REMIX_SOURCE = path.resolve(PROJ, REMIX_NAME);
const REMIX_CONFIG = path.resolve(REMIX_SOURCE, REMIX_CONFIG_NAME);

const PROJ_XML = path.resolve(REMIX_NAME, `.~xml/ui`);


module.exports = {
  INTERNAL_IP,

  REMIX_CONFIG,
  REMIX_NAME,
  REMIX_SOURCE,

  PROJ,
  PROJ_XML,
  PROJ_NAME,
  PROJ_BUILD,
}