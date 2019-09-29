
const path = require('path');
const fs = require('fs-extra');
const exec = require('child_process').exec;
const inquirer = require('inquirer');
const globby = require('globby');
const XMLBuilder = require('remixjs-xml');
const logger = require('../../shared/logger');
const questions = require('./questions');
const { createTemplate } = require('../../shared/template');

const env = require('../../shared/env');

async function installDependencies (answers) {
  const files = await globby(['node_modules/**/'], {
    cwd: env.PROJ
  });

  const isInstalled = files.length === 0 ? false : true;

  if (isInstalled) {
    logger.green(`正在安装项目依赖...`);

    if (answers.style) {
      await Promise.all([
        `${answers.css}@latest`, 
        `${answers.css}-loader@latest`
      ].map(pkg => {
        return new Promise((resolve, reject) => {
          exec(`npm i --save-dev --registry=https://registry.npm.taobao.org ${pkg}`, {
            stdio: 'inherit',
            cwd: env.PROJ
          }, (err) => {
            if (err) {
              return reject(err);
            }

            resolve();
          });
        }) 
      }));
    }

    await new Promise((resolve, reject) => {
      exec(`npm i --registry=https://registry.npm.taobao.org ${pkg}`, {
        stdio: 'inherit',
        cwd: env.PROJ
      }, (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });

    console.green(`项目创建完成， enjoy remixjs!`); 
  }
}

async function getContext () {
  if (await fs.exists(env.REMIX_SOURCE)) {
    return looger.orange(`当前目录已经存在 remixjs 项目`);
  }


  const answers = await inquirer.prompt([
    questions.isCurrentDirectory,
    questions.appid
  ]);

  if (answers.isCurrentDirectory) {
    logger.green(`正在初始化项目...`);

    if (!questions.appid) {
      logger.orange(`您没有输入小程序 AppId`);
    }

    const files = await globby('./**/*', {
      cwd: path.resolve(__dirname, 'proj'),
      dot: true
    });

    const template = createTemplate(
      path.resolve(__dirname, 'proj'),
      env.PROJ,
      files
    );

    await template.render({
      ...answers,
      name: path.parse(env.PROJ).name,
      compile: ''
    });

    await XMLBuilder.build(env.PROJ_XML);

    await installDependencies();
  } else {
    process.exit(1);
  }
}

async function start () {
  logger.green(`感谢使用 @remixjs, 正在为您创建项目...`);

  await getContext();
}

module.exports = async function () {
  await start();
}