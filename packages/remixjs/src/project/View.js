import uuid from 'uuid';
import { isFunction } from '../shared/is';
import transports from './runtime/transports';

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
        data: {
          element: null
        },
        onLoad (query) {
          const v = this;

          transports.view.load({
            id: ctrl.id,
            route: ctrl.route,
          }, query, (element) => {
            v.setData({ element });
          });
        }
      })
    }
  }
}

