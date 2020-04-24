const chokidar = require('chokidar');
const proj = require('../../../config/proj');

async function watch (onChange) {
  const watcher = chokidar.watch(proj.PROJ_SOURCE);
  
  watcher.on('change', onChange);
  process.on('beforeExit', () => watcher.close());
}