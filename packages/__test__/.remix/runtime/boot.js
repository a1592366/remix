import { Program } from '@remix/core/project';
import { document } from '@remix/core/document';
import Application from '../../src';

const program = new Program(Application, document.body);

export { program }
export default program;
