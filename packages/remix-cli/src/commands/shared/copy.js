const path = require('path');
const mem = require('mem-fs');
const memEditor = require('mem-fs-editor');
const logger = require('../../shared/notify');

module.exports = async function copy (src, dist, files) {
  const store = mem.create();
  const fs = memEditor.create(store);

  return function (data) {
    files.forEach((file, index) => {
      index = index + 1;

      const number = index > 9 ? `${index}. ` : `${index}.  `;

      fs.copyTpl(
        path.resolve(src, file),
        path.resolve(dist, file),
        data
      );

      logger.green(`${number} ${file}`);
    });

    return new Promise((resolve, reject) => {
      fs.commit(() => resolve());
    });
  }
}
