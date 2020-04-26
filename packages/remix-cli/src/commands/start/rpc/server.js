const rpc = require('jayson');
const fork = require('child_process').fork;

const env = require('../../../config/env');
const proj = require('../../../config/proj');

const server = rpc.server({
  context (argv, callback) {
    const ps = fork(proj.REMIX_NODE_RUNTIME, {
      cwd: proj.PROJ_DIR,
      stdio: 'inherit'
    });

    ps.on('message', (context) => {
      callback(null, context);
    });
  }
});

const http = server.http()
http.listen(env.RPC_PORT);
http.on('error', () => {});