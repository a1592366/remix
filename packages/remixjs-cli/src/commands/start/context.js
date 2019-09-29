const babelRegister = require('babel-register');
const fs = require('fs-extra');
const env = require('../../shared/env');


function createBootstrapJavaScriptString (file) {
  return `
    import { createElement } from 'react';
    import { render } from 'react-dom';
    import Project from 'remixjs/project';
    import Application from '${file}';
    
    const project = new Project(
      render(createElement(Application, {}, [])).vnode
    );

    if (typeof App === 'function') {
      App(project.application);
    }

    export { project }
    export default project;
  `;
}

function registerBabelRuntime () {
  const javascriptString = createBootstrapJavaScriptString(env.PROJ_ENTRY);

  babelRegister({
    cache: false,
    extensions: ['js', 'jsx']
  });

  fs.writeFileSync(env.REMIX_BOOT, javascriptString);

  const context = require(env.REMIX_BOOT);

  process.send(context);
}

registerBabelRuntime();

