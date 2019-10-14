const path = require('path');
const fs = require('fs-extra');
const babelRegister = require('@babel/register');

function registerBabelRuntime () {

  babelRegister({
    cache: false,
    ...fs.readJSONSync(path.resolve(__dirname, '../.babelrc')),
    extensions: ['.js', '.jsx'],
    // cwd: path.resolve(process.cwd(), '..'),
    cwd: process.cwd(),
    ignore: [function (file) {
      if (file.indexOf('/packages/') > -1) {
        return false;
      }
      
      return true;
    }]
    // sourceRoot: path.resolve(process.cwd(), '..'),
    // babelrcRoots: process.cwd(),
  });

  const context = require('./boot');

  process.send(context);
}

registerBabelRuntime();

