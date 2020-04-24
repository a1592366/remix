const create = require('../views');
const proj = require('../../../config/proj');

module.exports = async function () {
  await create(proj.REMIX_VIEWS);
};