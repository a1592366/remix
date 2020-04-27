const fs = require('fs-extra');
const { resolve, parse } = require('path');
const compile = require('../compile');
const notify = require('../../../shared/notify');
const proj = require('../../../config/proj');

async function updateJSON (tabBar, pages, config) {
  await fs.writeFile(
    resolve(proj.REMIX_SOURCE, 'app.json'),
    JSON.stringify({ tabBar, pages, window: config, }, null, 2)
  );
}

async function updatePages (pages) {
  

  await Promise.all(pages.map(page => {
    const { base, dir } = parse(page);
    const viewString = `
      import { View } from '@remix/core/project';
      new View('${page}');
    `;

    return new Promise(async (accept) => {
      const { REMIX_SOURCE, REMIX_VIEW_SYMBOL } = proj;
      
      const dist = resolve(REMIX_SOURCE, dir);
      const js = resolve(dist,`${REMIX_VIEW_SYMBOL}${base}.js`);
      const xml = resolve(dist, `${base}.wxml`);
      const json = resolve(dist, `${base}.json`);
      
      await fs.mkdirp(dist);      
      await Promise.all([
        fs.writeFile(json, JSON.stringify({ usingComponents: { view: '../../views/remix-view/index' }}, null, 2)),
        fs.writeFile(js, viewString),
        fs.writeFile(xml, `<view child="{{element}}" />`)
      ]);

      accept();
    });
  }));
}

module.exports = async function projecting (context) {
  let compiler = compile(context);
  
  const restart = async (context) => {
    if (compiler) {
      await compiler.stop();
      compiler = compile(context);
    }

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
          const { items, children, ...others } = tabBar;
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
                .forEach(k => json[k.alias] = it[k.key]);
  
              return {
                text: it.text,
                pagePath: it.path,
                iconPath: it.icon,
                selectedIconPath: it.selectedIcon
              };
            })
          };
        } 
        
      }
    }
  
    notify.green(`正在编译 Remix 项目，请稍后...`);
    await updateJSON(application.tabbar, application.pages, context.config);
    await updatePages(application.pages);
  
    await compiler.start(context);
  }

  await restart(context);

  return restart;
}