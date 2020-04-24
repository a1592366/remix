import uuid from 'uuid';
import { isFunction } from '../shared/is';
import { terminalTransports } from './runtime/transports';
import env from '../../env';

const transports = terminalTransports;

export default class View {
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
        onShareAppMessage () {}
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
    if (path === this.route) {
      transports.view.load({
        id: this.id,
        query: this.query,
        route: this.route
      }, (element) => {
        this.instance.setData({ element });
      });
    }
  }
}

