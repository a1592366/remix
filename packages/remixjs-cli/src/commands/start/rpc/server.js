const rpc = require('jayson');
const path = require('path');
const fork = require('child_process').fork;
const env = require('../../../shared/env');

const server = rpc.server({
  context (argv, callback) {
    console.log(123)
    const ps = fork(path.resolve(env.REMIX_SOURCE, './runtime.js'), {
      cwd: env.PROJ
    });

    ps.on('message', () => {
      debugger;
    });
  }
});

server.http().listen(env.REMIX_RPC_PORT);