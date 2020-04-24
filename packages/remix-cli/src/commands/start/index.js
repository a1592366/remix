const fs = require('fs-extra');
const chokidar = require('chokidar');
const env = require('../../shared/env');
const inspect = require('../../shared/inspect');
const project = require('./steps/projecting');
const rpc = require('./rpc');


async function watch () {
  const { result: context } = await rpc.getContext();

  const proj = project(context);
  const watcher = chokidar.watch(env.PROJ_SOURCE);

  await proj.start();
  
  if (env.IS_INSPECT_MODE) {
    await inspect.start();
  }


  watcher.on('change', async (file) => {
    if (file === env.PROJ_ENTRY) {
      const { result: context } = await rpc.getContext();

      proj.update(context);
    } else {

    }
  });

  process.on('beforeExit', () => {
    watcher.close();
    proj.stop();
    rpc.exit();
  });
}

module.exports = async (type, config) => {
  const { result: context } = await rpc.context();

  const project = await projecting(context);

  await watch(context, () => {
    
  });
}

