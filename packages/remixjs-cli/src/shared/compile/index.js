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

  distroy () {
    if (this.instance) {
      this.instance.close();
    }
  }

  start () {
    this.webpack = webpack(this.config);

    this.webpack.watch({}, (err, stat) => {
      if (err) {
        logger.red(err);
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