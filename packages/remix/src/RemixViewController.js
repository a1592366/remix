import React from './Remix';
import render from './RemixRenderer';
import * as Support from './RemixViewSupport';
import { INTERNAL_RELATIVE_KEY } from './RemixShared';
import { document } from './RemixDocument';
import { shallowEqual } from './RemixShared';

const { Subscriber } = Support;

const views = document.createElement('views')
document.body.appendChild(views);

export function ViewControllersManager (context, instance) {
  const viewControllers = [];
  const views = {};
  let viewController = null;

  context.router.routes.forEach(route => {
    views[route.path] = route;
  });

  Subscriber.on(Support.LOAD, (view) => {
    const { id, query, route } = view;
    let controller = viewControllers[id];
    
    if (!controller) {
      const Class = views[route];

      if (view) {
        controller = new ViewController(id, route, query);
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

  Subscriber.on(Support.SHOW, ({ id }) => {
    viewController = viewControllers[id];
  });

  Subscriber.on(Support.EVENT, function (type, uuid, parent, event, sync) {
    const { target } = event;

    const view = viewController.view.getElementById(target.id);
    
    scheduleWork({ type, view, event });
  });
}

class ViewController {
  constructor (id, route, query) {
    this.id = id;
    this.route = route;
    this.query = query;
    this.view = document.createElement('view-controller');
    this.view[INTERNAL_RELATIVE_KEY] = id;

    this.view.setAttribute('route', route);
    this.view.setAttribute('query', query);

    views.appendChild(this.view);
  }

  onLoad (query) {}

  shouldUpdate (query) {
    return shallowEqual(query, this.query);
  }

  render () {
    render(
      React.createElement(this.Class), 
      this.view
    );
  }
}