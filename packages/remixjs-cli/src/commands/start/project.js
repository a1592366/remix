const fs = require('fs-extra');
const path = require('path');
const { diff } = require('deep-object-diff');
const globby = require('globby');
const env = require('../../shared/env');
const logger = require('../../shared/logger');
const { createCompileEngine } = require('../../shared/compile');


class Project {
  static createProject (context) {
    return new Project(context);
  }

  constructor (context) {
    this.context = context;  
    this.engine = createCompileEngine();
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
        window: this.context.config,
      }, null, 2)
    )
  }

  async updateApplicationPages () {
    const pages = this.pages;

    await Promise.all(pages.map(page => {
      const parsed = path.parse(page);

      return new Promise(async (resolve, reject) => {
        const dist = path.resolve(env.REMIX_SOURCE, parsed.dir);
        const filename = path.resolve(dist,`${env.REMIX_VIEW_SYMBOL}${parsed.base}.js`);
        const xml = path.resolve(dist, `${parsed.base}.wxml`)
        await fs.mkdirp(dist);
        await fs.writeFile(filename, `
import { View } from 'remixjs/project';
new View('${page}');`
        );
        await fs.writeFile(xml, ``);

        resolve();
      });
    }));
  }

  async distroy () {
    this.engine.stop();

    const pages = this.pages;

    await Promise.all(pages.map(page => {
      const parsed = path.parse(page);

      return fs.remove(parsed.dir);
    }))
  }

  async stop () {
    await this.engine.stop();
  }

  async start () {
    this.engine.update(this.context);

    logger.green(`正在编译...`);

    await this.distroy();
    await this.updateApplicationJSON();
    await this.updateApplicationPages();
    await this.engine.start();

    logger.green(`编译完成，可以开发了`);
  }

  async update (context) {
    const res = diff(this.context, context);
    const keys = Object.getOwnPropertyNames(res);

    if (keys.length > 0) {
      this.context = context;
      if (keys.includes('pages')) {
        await this.start();
      } else {
        await this.updateApplicationJSON();
      }
    }
  }
}

module.exports = {
  Project,
  createProject (context) {
    return new Project(context)
  }
};