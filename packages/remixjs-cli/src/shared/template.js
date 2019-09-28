const path = require('path');
const mem = require('mem-fs');
const memEditor = require('mem-fs-editor');
const logger = require('./logger');

class Template {
  constructor (src, dist, files) {

    this.src = src;
    this.dist = dist;
    this.files = files;

    this.store = mem.create();
    this.fs = memEditor.create(this.store);
  }

  async copy (file, model, callback) {
    this.fs.copyTpl(
      path.resolve(this.src, file),
      path.resolve(this.dist, file),
      model
    );

    callback(file);
  }

  async commit (callback) {
    this.fs.commit(callback);
  }

  async render (model) {
    this.files.forEach((file, index) => {
      index = index + 1;

      const number = index > 9 ? `${index}. ` : `${index}.  `;

      this.copy(file, model, (file) => {
        logger.green(`${number} ${file}`);
      });
    });

    return new Promise((resolve, reject) => {
      this.commit(async () => {
        resolve();
      });
    });
  }
}


function createTemplate (src, dist, files) {
  const instance = new Template(src, dist, files);

  return instance;
}

module.exports = {
  createTemplate
}