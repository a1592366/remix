const createViews = require('./wxml');

module.exports = async function (dist) {
  await createViews(dist);
}