import transports from './transports';
import ViewManager from './ViewManager';


class Runtime {
  constructor (context) {
    this.context = context;
    this.viewManager = new ViewManager(context);

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
};

export {
  transports
}
export * from './transports/types';
export default function (context) {
  return new Runtime(context)
};