const webpack = require('webpack');
const development = require('./webpack.config').development;

const notify = require('../../../shared/notify');

module.exports = function compile () {
  let config = null;
  let compiler = null;
  
  return {
    start () {
      compiler = webpack(config);

      return new Promise((resolve, reject) => {
        compiler.watch({}, (err, stats) => {
          if (err) {
            notify.red(err);
          } else {
            // console.log(stats.toString({ color: true }));
          }
  
          resolve();
        });
      });
    },

    stop () {
      if (compiler) {
        compiler.close();
        compiler = null;
      }
    },
    set context (ctx) {
      config = development(ctx);
    }
  }
};