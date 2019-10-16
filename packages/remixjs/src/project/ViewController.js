import { isFunction } from '../shared/is';

export default class ViewController {
  constructor () {
    this.registerViewController();  
  }

  registerViewController () {
    if (isFunction(Page)) {
      Page({
        data: { initialized: false },
        onLoad (query) {
          initialized(query, this);
        },
        onShow () {
          const { data, route } = this;
          const { initialized } = data;

          if (initialized) {
            postPageMessage(LIFECYCLE, 'show', [{ route }]);
          }
        },
        onHide () {
          const { data, route } = this;
          const { initialized } = data;

          if (initialized) {
            postPageMessage(LIFECYCLE, 'hide', [{ route }]);
          }
        },
        
        onPullDownRefresh () {
          const { data, route } = this;
          const { initialized } = data;

          if (initialized) {
            postPageMessage(EVENT, 'onPullDownRefresh', [{ route }]);
          }
        },

        onReachBottom () {
          const { data, route } = this;
          const { initialized } = data;

          if (initialized) {
            postPageMessage(EVENT, 'onReachBottom', [{ route }]);
          }
        },

        onPageScroll () {
          const { data, route } = this;
          const { initialized } = data;

          if (initialized) {
            postPageMessage(EVENT, 'onPageScroll', [{ route }]);
          }
        },

        onResize () {
          const { data, route } = this;
          const { initialized } = data;

          if (initialized) {
            postPageMessage(EVENT, 'onResize', [{ route }]);
          }
        },

        onTabItemTap () {
          const { data, route } = this;
          const { initialized } = data;

          if (initialized) {
            postPageMessage(EVENT, 'onTabItemTap', [{ route }]);
          }
        }        
      });
    }
  }  
}
