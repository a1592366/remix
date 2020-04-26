const fs = require('fs-extra');
const chokidar = require('chokidar');
const rpc = require('./rpc');
const env = require('../../shared/env');
const inspect = require('../../shared/inspect');
const projecting = require('./steps/projecting');
const watch = require('./steps/watch');


module.exports = async (type, config) => {
  const { result: context } = await rpc.context();

  const project = await projecting(context);

  await watch(context, () => {
    
  });
}

