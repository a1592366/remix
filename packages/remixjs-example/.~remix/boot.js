import document from 'remixjs/document';
import MiniProgram from 'remixjs/project';
import Application from '../src';

const program = new MiniProgram(Application, document.body);

export { program }
export default program;
