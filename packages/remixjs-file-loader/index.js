const utils = require('loader-utils');
const mime = require('mime');
const path = require('path');
const mem = require('mem-fs');
const memEditor = require('mem-fs-editor');

const store = mem.create();
const memFs = memEditor.create(store);

const cwd = process.cwd();

module.exports = function (src) {
  const options = utils.getOptions(this);
  const { _module } = this;
  const { rawRequest, resource } = _module;

  memFs.copyTpl(
    resource,
    path.resolve(options.dist, rawRequest),
    {}
  );

  memFs.commit(() => {});

  return `module.exports = '${rawRequest}'`;
}