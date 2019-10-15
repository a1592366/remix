import { createElement } from '../react';
import { render } from '../renderer';
import { document } from '../document';

import { Application, TabBar } from '../components';
import Router, { Route } from '../router';
import { isNullOrUndefined } from '../shared/is';


export default class MiniProgram {
  constructor (Application, container) {
    MiniProgram.context = this;

    this.renderApplication(Application, container);
    this.getApplicationContext();
    this.getApplicationInstance();
    this.registerApplication();
  }

  renderApplication (Application, container) {
    render(createElement(Application), container);
    
    const rootContainer = container._reactRootContainer;
    const root = rootContainer._internalRoot;
    const current = root.current;

    this.currentFiber = current;
  }

  registerApplication () {
    if (typeof App === 'function') {
      const { instance } = this;

      App({
        onLaunch () {
          instance.runtime.postMessage({
            level: 'application',
            type: 'event',
            data: {
              
            }
          });
        },

        onError () {
          instance.runtime.postMessage({

          })
        }
      })
    }
  }

  getApplicationInstance = () => {

  }

  getApplicationContext = () => {
    let currentFiber = this.currentFiber;
    const context = {
      config: null,
      tabBar: {
        items: []
      },
      router: {
        routes: []
      },
    };

    while (currentFiber) {
      switch (currentFiber.elementType) {
        case Application: {
          const props = currentFiber.memoizedProps;
          context.config = props.config;
          break;
        }
          
        case Router: {
          debugger;
          break;
        }

        case Route: {
          const props = currentFiber.memoizedProps;
          
          context.router.routes.push({
            path: props.path
          })
          break;
        }
      }

      if (isNullOrUndefined(currentFiber.sibling)) {
        currentFiber = currentFiber.child;
      } else {
        currentFiber = currentFiber.sibling;
      }
    }

    this.context = context;
  }

  getContext () {
    return this.context;
  }
}

export const getApplication = () => {
  return MiniProgram.context;
}
