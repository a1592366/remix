const fs = require('fs-extra');
const chokidar = require('chokidar');
const env = require('../../shared/env');
const createProject = require('../../shared/project').createProject;
const rpc = require('./rpc');


process.on('unhandledRejection', error => {
  throw error
});

async function watch () {
  const context = await rpc.getContext();

  const project = createProject();
  const watcher = chokidar.watch(env.PROJ_ENTRY);

  watcher.on('change', async () => {
    project.build();
  });

  process.on('beforeExit', () => {
    watcher.close();
    project.distroy();
  });
}

module.exports = async (type, config) => {
  await watch();
}

