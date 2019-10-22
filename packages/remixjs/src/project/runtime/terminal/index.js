import uuid from 'uuid';
import transports from '../transports';
import ViewManager from '../ViewManager';
import env from '../../../../env';


class Runtime {
  constructor (context) {
    this.context = context;
  }

  inspect (callback) {
    return new Promise((resolve, reject) => {
      transports.app.inspect(() => {
        resolve();
      });

      transports.app.on('reLaunch', () => {
        wx.reLaunch({});
        wx.hideTabBar();
        wx.showLoading({
          title: `等待连接...`
        });
      })
    });
  }

  run () {
    const launchApplication = () => {
      if (typeof App === 'function') {
        wx.showTabBar();
        wx.hideLoading();

        App({
          onLaunch (options) {
            transports.app.launch(options);
            transports.app.emit('launch', options);
            
            env.isApplicationLaunched = true;
          },
          
          onError (e) {
            transports.app.error(e);
          }
        });
      }
    }

    if (env.isInspectMode) {

      wx.hideTabBar();
      wx.showLoading({
        title: `等待连接...`
      });

      this.inspect().then(() => {
        launchApplication();
      }).catch();
    } else {
      launchApplication();
    }
  }
};

export {
  transports
}
export * from '../transports/types';
export default function (context) {
  const runtime =  new Runtime(context);
  const viewManager = new ViewManager(context);

  runtime.run();
};