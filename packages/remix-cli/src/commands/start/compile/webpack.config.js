const { resolve, join, parse } = require('path');
const CopyPulgin = require('copy-webpack-plugin');

const defaultWebpackConfig = require('./webpack.default.config');

const proj = require('../../../config/proj');
const env = require('../../../config/env');

module.exports = {
  development (context) {
    const { router: { routes }, tabBar } = context;
    const config = {
      ...defaultWebpackConfig,
      mode: 'development'
    }

    routes.forEach(route => {
      const parsed = parse(route.path);
      const source = join(
        proj.REMIX_SOURCE, 
        parsed.dir, 
        `${proj.REMIX_VIEW_SYMBOL}${parsed.base}.js` 
      );

      config.entry[`${route.path}`] = source;
    });

    if (env.INSPECTOR.MODE) {
      config.entry['runtime/devtool'] = proj.REMIX_DEVTOOL_RUNTIME;
    }

    const source = [];

    tabBar.items.filter(tab => {
      return tab.icon || tab.selectedIcon
    }).forEach(tab => {
      if (!source.includes(tab.icon)) {
        source.push(tab.icon);
      }

      if (!source.includes(tab.selectedIcon)) {
        source.push(tab.selectedIcon);
      }
    });

    if (source.length > 0) {
      config.plugins.push(
        new CopyPulgin(source.map(src => {
          return {
            from: resolve(proj.PROJ_SOURCE, src),
            to: resolve(proj.REMIX_SOURCE, src)
          }
        }))
      );
    }

    return config;
  }
}