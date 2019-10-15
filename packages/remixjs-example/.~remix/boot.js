import MiniProgram from 'remixjs/project';
import { document } from 'remixjs/document';
import Application from '../src';

const program = new MiniProgram(Application, document.body);

export { program }
export default program;
