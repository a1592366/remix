
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const globby = require('globby');
const console = require('../../shared/console');
const questions = require('./questions');
const { createTemplate } = require('../../shared/template');

const template = createTemplate();

async function installDependencies () {
  const files = await globby(['node_modules/**/'], {
    cwd: PROJECT_PATH
  });

  return files.length === 0 ? false : true;
}

async function getContext () {
  const answers = await inquirer.prompt([
    questions.isCurrentDirectory,
    questions.appid
  ]);

  if (answers.isCurrentDirectory) {
    console.green(`正在初始化项目...`);

    if (questions.appid === null) {
      console.orange(`您没有输入小程序 AppId`);
    }

    await template.render({
      
    });


  } else {
    process.exit(1);
  }
}

async function start () {
  console.green(`感谢使用 @remixjs, 正在为您创建项目...`);

  await getContext();
}

module.exports = async function () {
  await start();
}