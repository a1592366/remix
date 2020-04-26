const fs = require('fs-extra');
const inquirer = require('inquirer');
const { resolve, parse } = require('path');

const proj = require('../../../config/proj');
const globby = require('../../../shared/globby');
const notify = require('../../../shared/notify');
const copy = require('./copy');

const questions = [
  ['confirm', '在当前目录创建项目：', 'directory', null],
  ['input', '请输入小程序 AppId：', 'appid', null],
];

async function prompt () {
  const fieldKeys = ['type', 'message', 'name', 'default'];

  return await inquirer.prompt(
    questions.map(question => {
      const field = {};

      question.forEach((value, index) => {
        field[fieldKeys[index]] = value;
      });

      return field;
    })
  );
}

async function reinitialize () {
  const answers = await inquirer.prompt([
    { 
      type: 'confirm',
      message: '是否需要重新初始化项目：',
      name: 'reinitialize',
      default: null
    }
  ]);

  if (answers.reinitialize) {
    await Promise.all([
      fs.remove(proj.REMIX_SOURCE),
      fs.remove(resolve(__dirname, 'node_modules')),
    ]);
  } else {
    process.exit(1);
  }
}

module.exports = async function () {
  // 判断是否存在 Remix 项目
  if (await fs.exists(proj.REMIX_SOURCE)) {
    return notify.red(`当前目录已经存在 Remix 项目`), process.exit(1);
    // await reinitialize();
  }

  notify.green(`感谢使用 Remix, 正在为您创建项目...`);

  const answers = await prompt();

  if (answers.directory) {
    notify.green(`正在初始化项目...`);

    const source = resolve(__dirname, '../proj');
    const files = await globby.files(source);

    await copy(source, proj.PROJ_DIR, files)({
      ...answers,
      name: parse(proj.PROJ_DIR).name,
      compile: proj.REMIX_NAME
    });
  }

  return answers;
}