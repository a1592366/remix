const fs = require('fs-extra');
const { resolve, parse } = require('path');
const notify = require('../../../shared/notify');
const compile = require('../compile');

async function updateJSON (tabBar, pages, config) {
  await fs.writeFile(
    resolve(proj.REMIX_SOURCE, 'app.json'),
    JSON.stringify({ tabBar, pages, window: config, }, null, 2)
  );
}

async function updatePages (pages) {
  const viewString = `
    import { View } from 'remix/project';
    new View('${page}');
  `;

  await Promise.all(pages.map(page => {
    const { base, dir } = parse(page);

    return new Promise(async (resolve) => {
      const { REMIX_SOURCE, REMIX_VIEW_SYMBOL } = proj;
      
      const dist = resolve(REMIX_SOURCE, dir);
      const js = resolve(dist,`${REMIX_VIEW_SYMBOL}${base}.js`);
      const xml = resolve(dist, `${base}.wxml`)
      
      await fs.mkdirp(dist);
      
      await Promise.all([
        fs.writeFile(js, viewString),
        fs.writeFile(xml, ``)
      ]);

      resolve();
    });
  }));
}

module.exports = async function projecting (context) {
  const compiler = compile(context);
  
  const application = {
    get pages () {
      const router = context.router;
      
      if (router) {
        return router.routes.map(route => route.path);
      }
    },

    get tabbar () {
      const tabBar = context.tabBar;

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
          list: items.map(it => {
            const json = { pagePath: it.path };

            keys
              .filter(k => it[k.keys])
              .forEach(k => json[k.alias] = item[k.key]);

            return {
              text: item.text,
              pagePath: item.path,
              iconPath: item.icon,
              selectedIconPath: item.selectedIcon
            };
          })
        };
      } 
      
    }
  }


  notify.green(`正在编译 Remix 项目，请稍后...`);
  await updateJSON(application.tabbar, application.pages, {});
  await updatePages(application.pages);
  await compiler.start();
}