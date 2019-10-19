const path = require('path');
const fork = require('child_process').fork;



module.exports = {
  start () {
    return new Promise((resolve, reject) => {
      const ps = this.process = fork(path.resolve(__dirname, 'server.js'), {
        stdio: 'inherit'
      });

      ps.on('message', ({ status }) => {
        if (status === 'ready') {
          resolve();
        }
      });

      ps.on('error', (err) => {
        reject(err);
      });
    });
  },

  stop () {
    ps
  }
}