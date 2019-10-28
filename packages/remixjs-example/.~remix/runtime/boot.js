import { Program } from 'remixjs/project';
import { document } from 'remixjs/document';
import env from 'remixjs/env';
import Application from '../../src';

env.isTerminalRuntime = true;

const program = new Program(Application, document.body);

export { program }
export default program;
