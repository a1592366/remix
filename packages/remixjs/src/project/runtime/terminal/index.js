import uuid from 'uuid';
import transports from '../transports';
import ViewManager from '../ViewManager';
import NativeRuntime from './NativeRuntime';
import env from '../../../../env';


class TerminalRuntime extends NativeRuntime {
  constructor (context) {
    super();

    this.context = context;
    this.options = null;
  }

  inspect (callback) {
    return new Promise((resolve, reject) => {
      transports.app.inspect(() => {
        resolve();
      });

      transports.app.on('reLaunch', () => {
        wx.reLaunch({
          url: `/${this.options.path}`
        });

        transports.app.on('reConnect', () => {
          wx.showTabBar();
          wx.hideLoading();
          transports.app.emit('launch', this.options);
        })

        wx.hideTabBar();
        wx.showLoading({
          title: `等待连接...`
        });

      });
    });
  }

  run () {
    const launchApplication = () => {
      const ctrl = this;

      if (typeof App === 'function') {
        wx.showTabBar();
        wx.hideLoading();

        App({
          onLaunch (options) {
            transports.app.launch(options);
            transports.app.emit('launch', options);

            ctrl.options = options
            
            env.isApplicationLaunched = true;
            env.applicationLaunchedOptions = options;
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
export * from 'remixjs-message-protocol';
export default function (context) {
  const runtime =  new TerminalRuntime(context);
  const viewManager = new ViewManager(context);

  runtime.run();
};