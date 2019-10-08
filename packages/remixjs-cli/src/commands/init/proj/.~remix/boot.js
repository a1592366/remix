import { createElement } from 'react';
import { render } from 'react-dom';
import Project from 'remixjs/project';
import Application from '../src';

const project = new Project(
  render(createElement(Application, {}, [])).vnode
);

if (typeof App === 'function') {
  App(project.application);
}

export { project }
export default project;
