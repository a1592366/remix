import { document } from '../../document';
import React from '../../react';
import ReactDOM from '../../renderer';
import * as ViewNativeSupport from './Support/ViewNativeSupport';
import { shallowEqual } from '../../shared';
import { scheduleWork } from '../../ReactEvent';
import { INTERNAL_RELATIVE_KEY } from '../../shared';

export function ViewControllersManager (context, instance) {
  const viewControllers = [];
  const views = {};
  let viewController = null;

  context.router.routes.forEach(route => {
    views[route.path] = route;
  });

  ViewNativeSupport.Subscriber.onLoad((view) => {
    const { id, query, route } = view;
    let controller = viewControllers[id];
    
    if (!controller) {
      const Class = views[route];

      if (view) {
        controller = new ViewController(id);
        controller.Class = Class.component;
        viewControllers[id] = controller;  
      } else {
        throw new Error(`未发现路由为 ${route} ViewController`);
      }
    } 

    controller.onLoad(query);

    if (controller.shouldUpdate(query)) {
      controller.query = query;
      controller.render();
    }
  })

  ViewNativeSupport.Subscriber.onShow(({ id }) => {
    viewController = viewControllers[id];
  });

  ViewNativeSupport.Subscriber.onEvent(function (type, uuid, parent, event) {
    const { target } = event;

    const view = viewController.view.getElementById(target.id);
    
    scheduleWork({ type, view, event });
  });
}

export default class ViewController {
  constructor (id) {
    this.id = id;
    this.view = document.createElement('view');
    this.view[INTERNAL_RELATIVE_KEY] = id;
  }

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