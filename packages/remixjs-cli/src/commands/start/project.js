const fs = require('fs-extra');
const path = require('path');
const env = require('../../shared/env');
const logger = require('../../shared/logger');
const { diff } = require('deep-object-diff');

class Project {
  static createProject (context) {
    return new Project(context);
  }

  constructor (context) {
    this.context = context;
  }

  get pages () {
    const { router } = this.context;

    if (router) {
      const { routes } = router;
      return routes.map(route => route.path);
    } else {
      logger.red(``);
    }
  }

  get tabBar () {
    const { tabBar } = this.context;

    if (tabBar) {
      const { items, ...others } = tabBar;
      const keys = [
        { key: 'text', alias: 'text' },
        { key: 'path', alias: 'pagePath' },
        { key: 'iconPath', alias: 'icon' },
        { key: 'selectedIconPath', alias: 'selectedIcon' }
      ];

      return {
        color: '#000000',
        backgroundColor: '#ffffff',
        ...others,
        list: items.map(item => {
          const json = {
            pagePath: item.path
          }

          keys
            .filter(k => item[k.keys])
            .forEach(k => {
              json[k.alias] = item[k.key];
            });

          return {
            text: item.text,
            pagePath: item.path,
            iconPath: item.icon,
            selectedIconPath: item.selectedIcon
          };
        })
      };
    } else {
      logger.red(``);
    }
  }

  async updateApplicationJSON () {
    await fs.writeFile(
      path.resolve(env.REMIX_SOURCE, 'app.json'),
      JSON.stringify({
        tabBar: this.tabBar,
        pages: this.pages,
        ...this.context.config
      }, null, 2)
    )
  }

  async distroy () {
    // await fs.remove();
    // await fs.mkdir();
  }

  async build () {
    await this.distroy();
    await this.updateApplicationJSON();
  }

  async update (context) {
    const res = diff(this.context, context);
    const keys = Object.getOwnPropertyNames(res);

    if (keys.length > 0) {
      
    }
  }
}

module.exports = {
  Project,
  createProject (context) {
    return new Project(context)
  }
};