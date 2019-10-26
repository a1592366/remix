import { Program } from 'remixjs/project';
import { document } from 'remixjs/document';
import env from 'remixjs/env';
import Application from '../../src';

env.isTerminalRuntime = true;

const container = document.createElement('view');
document.body.appendChild(container);

const program = new Program(Application, container);

export { program }
export default program;
