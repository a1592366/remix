import { Program } from 'remix/project';
import { document } from 'remix/document';
import env from 'remix/env';
import Application from '../../src';

env.isLogicRuntime = true;

const container = document.createElement('div');
document.body.appendChild(container);


const program = new Program(Application, container);

program.start();
