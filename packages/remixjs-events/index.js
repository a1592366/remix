const events = require('./events');

const names = {};
const shorts = {};
const methods = {};

events.forEach(event => {
  const { name, short, method } = event;

  shorts[short] = names[name] = methods[method] = event;
});

module.exports = {
  names,
  events,
  shorts,
  methods,
}