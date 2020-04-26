import AppNativeSupport from './AppNativeSupport';
import ViewNativeSupport from './ViewNativeSupport';
import env from '../../../../config';

const isDevToolMode = env.mode === 'devtool';

export default {
  get App () {
    return AppNativeSupport;
  },

  get View () {
    return ViewNativeSupport;
  },

  get api () {
    if (!transports.api) {
      transports.api = isDevToolMode ?
        new APITransport() :
        new APITransportNative();
    }

    return transports.api;
  }
}