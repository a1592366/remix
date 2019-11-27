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
    '.png', '.jpg', '.gif', '.ico', '.svg',
    '.css', '.scss', 'l.ess'
  ];

  const moduleRequire = Module.prototype.require;

  Module.prototype.require = function (request) {
    const parsed = path.parse(request);

    if (parsed.ext) {
      if (extensions.includes(parsed.ext)) {
        return request;
      } 
    }

    return moduleRequire.call(this, request);
  }
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


  console.log(JSON.stringify(program.context))

  process.send(program.context);

  

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

