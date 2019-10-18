import { Program } from 'remixjs/project';
import { document } from 'remixjs/document';
import Application from '../../src';

const container = document.createElement('div');
document.body.appendChild(container);

const program = new Program(Application, container);

export { program }
export default program;
