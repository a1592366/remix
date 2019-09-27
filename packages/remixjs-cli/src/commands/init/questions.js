const inquirer = require('inquirer');

module.exports = {
  isCurrentDirectory: {
    type: 'config',
    message: '是否在当前目录创建项目：',
    name: 'isCurrentDirectory',
    default: null
  },

  appid: {
    type: 'input',
    message: '请输入小程序 AppId：',
    name: 'appid',
    default: null
  },

  css: {
    
  }
}