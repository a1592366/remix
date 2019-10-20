const path = require('path');
const spawn = require('child_process').spawn;
const env = require('../env');
const createServer = require('./server');

module.exports = {
  start () {
    return createServer();
  },

  stop () {
    ps
  }
}