const babelRegister = require('@babel/register');
const fs = require('fs-extra');

function registerBabelRuntime () {
  const javascriptString = createBootstrapJavaScriptString(env.PROJ_ENTRY);

  babelRegister({
    cache: false,
    extensions: ['.js', '.jsx']
  });

  const context = require('./boot');

  process.send(context);
}

registerBabelRuntime();

