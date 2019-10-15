const babelRegister = require('@babel/register');


function registerBabelRuntime () {
  babelRegister({
    cache: false,
    extensions: ['.js', '.jsx']
  });

  debugger;
  const context = require('./boot');

  process.send(context);
}

registerBabelRuntime();

