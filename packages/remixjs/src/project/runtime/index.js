

import notification from '../notification';


function runtime (context) {
  if (typeof App === 'function') {
    runtime.context = context;
    
    App({
      onLaunch (e) {
        notification.app().launch(e);
      },
      
      onError (e) {
        notification.app().error(e);
      }
    });
  }
};

export function getRuntimeContext () {
  return runtime.context;
}

export default runtime;