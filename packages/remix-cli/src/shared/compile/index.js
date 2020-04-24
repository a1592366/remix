const webpack = require('webpack');

const logger = require('../notify');

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

    return new Promise((resolve, reject) => {
      this.webpack.watch({}, (err, stats) => {
        if (err) {
          logger.red(err);
        } else {
          // console.log(stats.toString({ color: true }));
        }

        resolve();
      });
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