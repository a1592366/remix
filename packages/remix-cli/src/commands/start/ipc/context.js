const path = require('path');
const fs = require('fs-extra');


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
  const babelRegister = require('babel-register');

  babelRegister({
    cache: false,
    ignore: ``,
    extensions: ['js', 'jsx']
  });
}

