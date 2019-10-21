import { Program } from 'remixjs/project';
import { document } from 'remixjs/document';
import env from 'remixjs/env';
import Application from '../../src';

env.isDevToolRunTime = true;

const container = document.createElement('div');
document.body.appendChild(container);


const program = new Program(Application, container);

program.start();
