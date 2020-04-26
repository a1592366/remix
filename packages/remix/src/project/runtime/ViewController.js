import { document } from '../../document';
import React, { createElement } from '../../react';
import ReactDOM from '../../renderer';
import * as ViewNativeSupport from './Support/ViewNativeSupport';
import { shallowEqual } from '../../shared';

export function ViewControllersManager (context, instance) {
  const viewControllers = [];
  const views = {};

  context.router.routes.forEach(route => {
    views[route.path] = route;
  });

  ViewNativeSupport.Subscriber.onLoad = ({ id, query, route }, callback) => {
    let controller = viewControllers[id];
    
    if (!controller) {
      const view = views[route];

      if (view) {
        controller = new ViewController(id);
        controller.Class = view.component;
        viewControllers[id] = controller;  
      } else {
        throw new Error(`未发现路由为 ${route} ViewController`);
      }
    } 

    controller.onLoad(query);

    if (controller.shouldUpdate(query)) {
      controller.query = query;
      callback(controller.render());
    }
  }
}

export default class ViewController {
  view = document.createElement('view');

  onLoad (query) {

  }

  shouldUpdate (query) {
    return shallowEqual(query, this.query);
  }

  render () {
    ReactDOM.render(
      React.createElement(this.Class), 
      this.view
    );

    return this.view.serialize();
  }
}