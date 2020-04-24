const chalk = require('chalk');

module.exports = {
  green (text) {
    console.log(chalk.green(text));
  },

  yellow (text) {
    console.log(chalk.bgYellow(text))
  },

  red (text) {
    console.log(chalk.bgRed(text));
  }
}