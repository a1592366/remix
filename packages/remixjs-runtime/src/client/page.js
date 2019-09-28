import { getApplication } from './application';
import message from '../message';
import { mode, types } from '../env';

const { level: { PAGE }, types: { LIFECYCLE, EVENT } } = message;

class PageProxy {
  constructor () {
    this.application = getApplication();
    this.register();  
  }

  register () {
    if (typeof Page === 'function') {
      const { worker } = this.application;
      const initialized = (query, page) => {
        const { route } = page;

        if (worker) {
          worker.postMessage({
            level: PAGE,
            type: LIFECYCLE,
            name: 'load',
            argv: [{ query, route }]
          }, (node) => {
            page.setData({ node, initialized: true }, () => {
              postPageMessage(LIFECYCLE, 'ready', [{ route }]);

              wx.nextTick(() => postPageMessage(LIFECYCLE, 'show', [{ route}]));
            });
          });
        }
      }

      const postPageMessage = (type, name, argv) => worker.postMessage({ level: PAGE, type, argv, name });

      Page({
        data: {
          initialized: false
        },
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

export default PageProxy;