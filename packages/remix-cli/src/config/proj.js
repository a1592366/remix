const path = require('path');

const resolve = (...argv) => path.resolve(...argv);

const PROJ_DIR = process.cwd();

const PROJ_SOURCE = resolve(PROJ_DIR, 'src');
const PROJ_ENTRY_FILE = resolve(PROJ_SOURCE, 'index.js');

const REMIX_NAME = '.remix';
const REMIX_VIEW_SYMBOL = '~';
const REMIX_SOURCE = resolve(PROJ_DIR, REMIX_NAME);
const REMIX_PAGES = resolve(REMIX_NAME, `pages`);
const REMIX_VIEWS = resolve(REMIX_SOURCE, `views`);

const REMIX_NODE_RUNTIME = path.resolve(REMIX_SOURCE, 'runtime/node.js');
const REMIX_CLIENT_RUNTIME = path.resolve(REMIX_SOURCE, 'runtime/client.js');

module.exports = {
  PROJ_DIR,
  PROJ_SOURCE,
  PROJ_ENTRY_FILE,

  REMIX_VIEWS,
  REMIX_NAME,
  REMIX_SOURCE,
  REMIX_PAGES,
  REMIX_VIEW_SYMBOL,

  REMIX_NODE_RUNTIME,
  REMIX_CLIENT_RUNTIME,
}