import React from './Remix';
import render from './RemixRenderer';
import * as Support from './RemixViewSupport';
import { INTERNAL_RELATIVE_KEY } from './RemixShared';
import { document } from './RemixDocument';
import { shallowEqual } from './RemixShared';
import { scheduleWork } from './RemixEvent';

const { Subscriber } = Support;

export const RemixViewController = new Map();
export const TAG_NAME = 'ViewController';

export function ViewControllersManager (context, instance) {
  const window = document.createElement('Window');
  const views = {};

  document.body.appendChild(window);

  context.router.routes.forEach(route => {
    views[route.path] = route;
  });

  Subscriber.on(Support.LOAD, (view) => {
    const { id, query, route } = view;
    let controller = window.getElementById(id);
    
    if (!controller) {
      const Class = views[route];

      if (view) {
        controller = new ViewController(id, route, query);
        controller.Class = Class.component;

        window.appendChild(controller.view);

        RemixViewController.set(id, controller);
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
    RemixViewController.current = RemixViewController.get(id);
  });

  Subscriber.on(Support.EVENT, function (type, event) {
    const { target } = event;
    const controller = RemixViewController.current;

    const view = controller.view.getElementById(target.id);
    
    scheduleWork({ type, view, event });
  });
}

class ViewController {
  constructor (id, route, query) {
    this.id = id;
    this.route = route;
    this.query = query;
    this.view = document.createElement(TAG_NAME);
    this.view[INTERNAL_RELATIVE_KEY] = id;

    this.view.setAttribute('route', route);
    this.view.setAttribute('query', query);
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