const fs = require('fs-extra');
const path = require('path');
const { diff } = require('deep-object-diff');
const globby = require('globby');
const env = require('../../shared/env');
const logger = require('../../shared/logger');
const { createTemplate } = require('../../shared/template');


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
        window: this.context.config,
      }, null, 2)
    )
  }

  async updateApplicationPages () {
    const files = await globby('./**/*', {
      cwd: path.resolve(__dirname, 'page'),
      dot: true
    });

    const pages = this.pages;

    await Promise.all(pages.map(page => {
      const parsed = path.parse(page);
      const source = path.resolve(__dirname, 'page');

      return new Promise(async (resolve, reject) => {
        const dist = path.resolve(env.REMIX_SOURCE, parsed.dir)
        await fs.mkdirp(dist);

        const template = createTemplate(
          source,
          dist,
          files
        );

        await template.render({
          
        })
      });
    }));
  }

  async distroy () {
    // await fs.remove();
    // await fs.mkdir();
  }

  async build () {
    await this.distroy();
    await this.updateApplicationJSON();
    await this.updateApplicationPages();
  }

  async update (context) {
    const res = diff(this.context, context);
    const keys = Object.getOwnPropertyNames(res);

    if (keys.length > 0) {
      this.context = context;
      if (keys.includes('pages')) {
        await this.build();
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