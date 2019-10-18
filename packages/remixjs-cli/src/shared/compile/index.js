const webpack = require('webpack');
const { createDevelopment } = require('./webpack.config');

const logger = require('../logger');

class CompileEngine {
  static createCompileEngine (...argv) {
    return new CompileEngine(...argv);
  }

  constructor () {
    this.webpack = null;
    this.context = null;
  }

  stop () {
    if (this.webpack) {
      this.webpack.close();
    }
  }

  start () {
    this.webpack = webpack(this.config);

    this.webpack.watch({

    }, (err, stats) => {
      if (err) {
        logger.red(err);
      } else {
        console.log(stats.toString({ color: true }));
      }

    });
  }

  build () {

  }

  update (context) {
    this.context = context;
    this.config = createDevelopment(context);
  }
}


module.exports = CompileEngine;