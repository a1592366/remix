import uuid from 'uuid';
import { isFunction } from '../shared/is';
import transports from './runtime/transports';
import env from '../../env';

export default class ViewController {
  constructor (route) {
    this.route = route;
    this.id = uuid.v4();

    this.init();
    transports.app.on('launch', this.onLaunch)
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

