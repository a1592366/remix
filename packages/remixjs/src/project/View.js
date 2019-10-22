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
        onLoad (query) { ctrl.onLoad(this, query) }
      })
    }
  }

  onLoad = (instance, query) => {
    this.instance = this;
    this.query = query;

    console.log(`[View] onLoad(${this.route})`);
  }

  onLaunch = ({ path }) => {
    if (path === this.route) {
      transports.view.load({
        id: this.id,
        query: this.query,
        route: this.route
      }, () => {
        debugger;
      });
    }
  }
}

