const globby = require('globby');

globby.files = async function (cwd, options = { dot: true }) {
  return await globby('./**/*', { cwd,  ...options });
}

globby.modules = async function (cwd, options = { dot: false }) {
  return await globby('./node_modules/**/', { cwd,  ...options });
}

module.exports = globby;