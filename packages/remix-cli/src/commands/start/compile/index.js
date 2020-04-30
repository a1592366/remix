const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const development = require('./webpack.config').development;

const notify = require('../../../shared/notify');

module.exports = function compile (context) {
  let config = null;
  let compiler = null;
  let watching = null;
  let server = null;

  config = development(context);
  return {
    start () {
      compiler = webpack(config);

      return new Promise((resolve, reject) => {
        watching = compiler.watch({}, (err, stats) => {
          if (err) {
            notify.red(err);
          } else {
            notify.green(stats.toString({ color: true }));
          }
  
          resolve();
        });
      });
    },

    stop () {
      if (compiler) {
        watching.close(() => {});
        compiler = null;
      }
    },
    set context (ctx) {
      config = development(ctx);
    }
  }
};