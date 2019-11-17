const fs = require('fs-extra');
const chokidar = require('chokidar');
const env = require('../../shared/env');
const inspect = require('../../shared/inspect');
const createProject = require('./project').createProject;
const rpc = require('./rpc');


async function watch () {
  const { result: context } = await rpc.getContext();

  const project = createProject(context);
  const watcher = chokidar.watch(env.PROJ_SOURCE);

  await project.start();
  
  if (env.IS_INSPECT_MODE) {
    await inspect.start();
  }

  watcher.on('change', async (file) => {
    if (file === env.PROJ_ENTRY) {
      const { result: context } = await rpc.getContext();

      project.update(context);
    } else {

    }
  });

  process.on('beforeExit', () => {
    watcher.close();
    project.stop();
    rpc.exit();
  });
}

module.exports = async (type, config) => {
  await watch();
}

