const rpc = require('jayson');
const path = require('path');
const fork = require('child_process').fork;
const env = require('../../../shared/env');

const server = rpc.server({
  context (argv, callback) {
    const ps = fork(env.REMIX_NODE_RUNTIME, {
      cwd: env.PROJ,
      stdio: 'inherit'
    });

    ps.on('message', (context) => {
      callback(null, context);
    });
  }
});

server.http().listen(env.REMIX_RPC_PORT);