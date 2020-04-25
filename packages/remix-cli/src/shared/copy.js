const { resolve } = require('path');
const mem = require('mem-fs');
const memEditor = require('mem-fs-editor');
const notify = require('./notify');

module.exports = function copy (src, dist, files) {
  const store = mem.create();
  const fs = memEditor.create(store);

  return function (data) {
    files.forEach((file, index) => {
      index = index + 1;

      const number = index > 9 ? `${index}. ` : `${index}.  `;

      fs.copyTpl(
        resolve(src, file),
        resolve(dist, file),
        data
      );

      notify.green(`${number} ${file}`);
    });

    return new Promise((resolve, reject) => {
      fs.commit(() => resolve());
    });
  }
}
