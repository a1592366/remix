const exec = require('child_process').exec;

const notify = require('../../../shared/notify');
const globby = require('../../../shared/globby');
const proj = require('../../../config/proj');
const env = require('../../../config/env');

async function hasNodeModulesInstalled () {
  const files = await globby.modules(proj.PROJ_DIR);
  return files.length > 0;
}

function install (packages = [], effect) {
  return new Promise((resolve, reject) => {
    const command = ['npm', 'i', effect, env.NPM_REGISTRY].filter(cmd => !!cmd);
    
    packages.forEach(pack => {
      command.push(pack);
    });

    exec(
      command.join(' '), 
      { stdio: 'inherit', cwd: proj.PROJ_DIR}, 
      error => reject(error)
    );
  })
}

module.exports = async function (answers) {
  if (!await hasNodeModulesInstalled()) {
    notify.green(`正在安装项目依赖...`);

    if (answers.css) {
      await install([
        `${answers.css}@latest`, 
        `${answers.css}-loader@latest`
      ], '--save-dev');
    }

    await install();
  }

  notify.green(`项目创建完成， enjoy Remix!`); 
}