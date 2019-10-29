import uuid from 'uuid';
import { isFunction } from '../shared/is';
import transports from './runtime/transports';
import env from '../../env';

export default class ViewController {
  constructor (route) {
    this.route = route;
    this.id = uuid.v4();

    this.init();
  }

  init () {
    const ctrl = this;

    if (isFunction(Page)) {
      Page({
        data: { element: null },
        onLoad (query) { ctrl.onLoad(this, query) },
        onShow () {},
        onHide () {},
        onUnload () {},
        onPullDownRefresh () {},
        onShareAppMessage (options) {
          return transports.view.shareMessage(options);
        },
      })
    }
  }

  onLoad = (instance, query) => {
    this.instance = instance;
    this.query = query;

    console.log(`[View] onLoad(${this.route})`);

    if (env.isApplicationLaunched) {
      this.onLaunch(env.applicationLaunchedOptions);
    }  else {
      transports.app.on('launch', this.onLaunch);
    }
  }

  onLaunch = ({ path }) => {
    transports.view.load({
      id: this.id,
      query: this.query,
      route: this.route
    }, (element) => {
      this.instance.setData({ element });
    });
  }
}

