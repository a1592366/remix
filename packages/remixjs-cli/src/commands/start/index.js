const fs = require('fs-extra');
const spawn = require('child_process').spawn;
const path = require('path');
const chokidar = require('chokidar');

const Compiler = require('../../compiler');
const { project } = require('../../common/configurations');

const Project = require('./project');

process.on('unhandledRejection', error => {
  throw error
});


async function watch () {
  const project = new Project();
  const watcher = chokidar.watch(env.PROJ_ENTRY);

  watcher.on('change', async () => {
    project.build();
  });

  process.on('beforeExit', () => {
    watcher.close();
    project.destroy();
  });
}

module.exports = async (type, config) => {
  await watch();
}

