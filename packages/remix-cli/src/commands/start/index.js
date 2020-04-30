const { resolve } = require('path');
const diff = require('deep-object-diff').diff;
const rpc = require('./rpc');
const proj = require('../../config/proj');
const inspect = require('../../shared/inspect');
const projecting = require('./steps/projecting');
const watch = require('./steps/watch');

const keys = Object;

module.exports = async (type, config) => {
  const { result: context } = await rpc.context();
  const restart = await projecting(context);
  
  await watch(async (file) => {
    if (
      file === proj.PROJ_ENTRY_FILE  ||
      file.indexOf(resolve(proj.PROJ_SOURCE, 'pages') > -1)
    ) {
      const { result: newContext } = await rpc.context();
      const content = diff(context, newContext);

      if (keys(content).length > 0) {
        notify.green(`正在重新编译项目，请稍后...`);
        await restart(newContext);
      }
    }
  });
}

