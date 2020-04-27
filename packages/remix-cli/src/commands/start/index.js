const rpc = require('./rpc');
const proj = require('../../config/proj');
const inspect = require('../../shared/inspect');
const projecting = require('./steps/projecting');
const watch = require('./steps/watch');


module.exports = async (type, config) => {

  const { result: context } = await rpc.context();

  const restart = await projecting(context);
  
  await watch(async (file) => {
    if (file === proj.PROJ_ENTRY_FILE) {
      const { result: context } = await rpc.context();
      await restart(context);
    }
  });
}

