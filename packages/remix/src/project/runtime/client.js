import * as AppNativeSupport from './Support/AppNativeSupport';
import env from '../../../config';

export default function (context, instance) {
  const onLaunch = (options) => {
    const { props } = instance;

    if (typeof props.onLaunch === 'function') {
      props.onLaunch(options);
    }
  }

  const runApplication = () => {
    if (typeof App === 'function') {
      wx.showTabBar();
      wx.hideLoading();

      App({
        onLaunch (options) {
          AppNativeSupport.Publisher.Launch(options);
        },
        onError () {}
      });
    } else {
      throw new Error(`请运行在微信小程序环境`);
    } 
  }

  runApplication();
}
