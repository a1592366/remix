import { MiniProgram } from '@remix/core/project';
import { document } from '@remix/core/document';
import Application from '../../src';

const container = document.createElement('div');
document.body.appendChild(container);

const program = new MiniProgram(Application, container);

export { program }
export default program;
