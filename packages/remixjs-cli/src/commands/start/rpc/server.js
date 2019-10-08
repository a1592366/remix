const rpc = require('jayson');
const path = require('path');
const fork = require('child_process').fork;
const env = require('../../../shared/env');

const server = rpc.server({
  context (argv, callback) {
    const ps = fork(path.resolve(env.REMIX_SOURCE, './rumtime.js'), {
      cwd: env.PROJ
    });

    ps.on('message', () => {

    });
  }
});

server.http().listen(env.REMIX_RPC_PORT);