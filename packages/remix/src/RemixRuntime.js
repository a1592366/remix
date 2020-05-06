import { ViewControllersManager } from './RemixViewController';
import * as Support from './RemixAppSupport';


const { Publisher } = Support;

export default function (context, instance) {
  new ViewControllersManager(context, instance);
  runApplication(context, instance);
} 

function runApplication (context, instance) {
  if (typeof App === 'function') {
    wx.showTabBar();
    wx.hideLoading();

    App({
      onLaunch (options) {
        Publisher.Launch(options);
      },
      onError () {}
    });
  } else {
    throw new Error(`请运行在微信小程序环境`);
  } 
}
