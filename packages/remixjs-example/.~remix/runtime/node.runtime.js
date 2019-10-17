const path = require('path');
const fs = require('fs-extra');
const babelRegister = require('@babel/register');

const ignore = {
  nodeModules: 'node_modules',
  remix: 'remixjs/src',
}

const ignoreStaticModule = () => {
  const Module = require('module');

  const extensions = [
    'png', 'jpg', 'gif', 'ico', 'svg',
    'css', 'scss', 'less'
  ];

  extensions.forEach(ext => {
    Module._extensions[`.${ext}`] = function (module, filename) {
      debugger;
      const dest = path.relative(__dirname, filename);
      debugger;

      module.exports = dest;
    }
  });
}

function registerBabelRuntime () {
  ignoreStaticModule();
  babelRegister({
    cache: false,
    ...fs.readJSONSync(path.resolve(__dirname, '../../.babelrc')),
    extensions: ['.js', '.jsx'],
    ignore: [function (file) {
      if (file.includes(ignore.nodeModules)) {
        return true;
      } else {
        return false;
      }      
    }]
  });

  const { program } = require('./boot');

  
  process.send(program.context);

  // console.log(context)

  // process.send(context || {
  //   tabbar: [],
  //   pages: []
  // });

  // process.send({
  //   tabBar: {
  //     items: [
  //       { text: '测试' }
  //     ]
  //   },
  //   router: {
  //     routes: [
  //       { path: 'pages/Index/index' }
  //     ]
  //   },
  //   config: {}
  // });
}

registerBabelRuntime();

