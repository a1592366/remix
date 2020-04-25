const createRemixViews = require('../ui');
const proj = require('../../../config/proj');

module.exports = async function () {
  await createRemixViews(proj.REMIX_VIEWS);
};