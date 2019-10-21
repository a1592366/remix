import uuid from 'uuid';
import transports from './transports';
import ViewManager from './ViewManager';
import env from '../../../env';


class Runtime {
  constructor (context) {
    this.context = context;
    this.id = uuid.v4();
  }

  inspect (callback) {
    return new Promise((resolve, reject) => {
      debugger;
      transports.app.inspect(this.id, () => {
        resolve();
      });
    });
  }

  run () {

    const launchApplication = () => {
      if (typeof App === 'function') {
        App({
          onLaunch (options) {
            transports.app.launch(options);
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
export * from './transports/types';
export default function (context) {
  const runtime =  new Runtime(context);
  const viewManager = new ViewManager(context);

  runtime.run();
};