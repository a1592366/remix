import uuid from 'uuid';
import transports from './transports';
import ViewManager from './ViewManager';
import * as env from '../../../env';


class Runtime {
  constructor (context) {
    this.context = context;
    this.viewManager = new ViewManager(context);
    this.id = uuid.v4();
  }

  inspect (callback) {
    return new Promise((resolve, reject) => {
      transports.app.inspect({
        id: this.id
      }, () => {
        resolve();
      });
    });
  }

  run () {
    const launchApplication = () => {
      if (typeof App === 'function') {
        App({
          onLaunch (e) {
            transports.app.launch(e);
          },
          
          onError (e) {
            transports.app.error(e);
          }
        });
      }
    }

    if (env.isInspectMode) {
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

  runtime.run();
};