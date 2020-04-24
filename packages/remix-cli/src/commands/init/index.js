
const init = require('./steps/init');
const install = require('./steps/install');
const createViews = require('./steps/views');


module.exports = async function () {
  const answers = await init();
  
  await install(answers);
  await createViews();
}