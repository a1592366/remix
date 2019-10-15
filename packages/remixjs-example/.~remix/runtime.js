const path = require('path');
const fs = require('fs-extra');
const babelRegister = require('@babel/register');

const ignore = {
  nodeModules: 'node_modules',
  remix: 'remixjs/src',
}

function registerBabelRuntime () {

  babelRegister({
    cache: false,
    ...fs.readJSONSync(path.resolve(__dirname, '../.babelrc')),
    extensions: ['.js', '.jsx'],
    ignore: [function (file) {
      if (file.includes(ignore.nodeModules)) {
        return true;
      } else {
        return false;
      }
      
      return true;
    }]
    // sourceRoot: path.resolve(process.cwd(), '..'),
    // babelrcRoots: process.cwd(),
  });

  // const context = require('./boot');

  // console.log(context)

  // process.send(context || {
  //   tabbar: [],
  //   pages: []
  // });

  process.send({
    tabBar: {
      items: [
        { text: '测试' }
      ]
    },
    router: {
      routes: [
        { path: 'pages/Index/index' }
      ]
    },
    config: {}
  });
}

registerBabelRuntime();

