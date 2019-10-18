import transports from './transports';


function runtime (context) {

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
};

export default runtime;
export {
  transports
}