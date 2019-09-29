const rpc = require('jayson');


function createRPCServer () {
  const server = rpc.Server({
    context () {
      console.log(123)
    }
  });

  return new Promise((resolve, reject) => {
    server.http().listen(() => {
      console.log(arguments, server);
    })
  });
}

module.exports = async function createRPCClient () {
  const port = await createRPCServer();
  const client = rpc.client.http({
    port
  });

  client.getContext = function () {
    return new Promise((resolve, reject) => {
      client.request('context', (err, res) => {
        if (err) {
          return reject(err);
        }

        resolve(res);
      })
    })
  }


  return client;
}