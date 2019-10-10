const path = require('path');
const fs = require('fs-extra');
const babelRegister = require('@babel/register');

const ignore = {
  nodeModules: 'node_modules',
  remix: 'remixjs',
}

function registerBabelRuntime () {

  babelRegister({
    cache: false,
    ...fs.readJSONSync(path.resolve(__dirname, '../.babelrc')),
    extensions: ['.js', '.jsx'],
    ignore: [
      function (file) {
        const cwd = process.cwd();
        const names = path.resolve(cwd, file).split(path.sep);

        if (names.includes(ignore.nodeModules)) {
          if (names.includes(ignore.remix)) {
            return false;
          }
        } else {
          return false;
        }

        return true;
      }
    ]
  });

  const context = require('./boot');

  process.send(context);
}

registerBabelRuntime();

