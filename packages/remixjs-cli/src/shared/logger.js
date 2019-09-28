const chalk = require('chalk');

module.exports = {
  green (text) {
    console.log(chalk.green(text));
  },

  orange (text) {
    console.log(chalk.orange(text))
  },

  red (text) {
    console.log(chalk.red(text));
  }
}