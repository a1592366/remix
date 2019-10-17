import { isFunction } from '../shared/is';
import { getRuntimeContext } from './runtime';

export default class ViewController {
  constructor (route) {
    this.route = route;
    
    this.register();  
  }

  callLifecycle (name, ...argv) {
    const context = getRuntimeContext();

    debugger;
  }

  register () {
    if (isFunction(Page)) {
      const viewController = this;
      Page({
        data: {},
        onLoad (options) {
          viewController.callLifecycle('onLoad', options);
        },
        onShow () {
          viewController.callLifecycle('onShow');
        },
        onHide () {
          viewController.callLifecycle('onShow');
        },
        onPullDownRefresh () {
          viewController.callLifecycle('onPullDownRefresh');
        },
        onReachBottom () {
          viewController.callLifecycle('onReachBottom');
        }
      })
    }
  }  
}
