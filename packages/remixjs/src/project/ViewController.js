import { isFunction } from '../shared/is';
import transport from './notification';

export default class ViewController {
  constructor (route) {
    this.route = route;
    
    if (isFunction(Page)) {
      const ctrl = this;

      Page({
        data: {},
        onLoad (options) {
          
        },
        onShow () {
          // viewController.callLifecycle('onShow');
        },
        onHide () {
          // viewController.callLifecycle('onShow');
        },
        onPullDownRefresh () {
          // viewController.callLifecycle('onPullDownRefresh');
        },
        onReachBottom () {
          // viewController.callLifecycle('onReachBottom');
        }
      })
    }
  }
}

