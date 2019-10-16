import { createElement } from '../react';
import { render } from '../renderer';
import { document } from '../document';

import { Application, TabBar } from '../components';
import { Router, Route } from '../router';
import { isNullOrUndefined } from '../shared/is';

const { TabBarItem } = TabBar;

export const getApplication = () => {
  return MiniProgram.context;
}

export default class MiniProgram {
  constructor (App, container) {
    MiniProgram.context = this;

    this.getApplicationInstance();
    this.registerApplication();

    Object.defineProperty(this, 'context', {
      get () {
        if (this.__context__) {
          return this.__context__;
        }

        const context = this.__context__ = {
          tabBar: {
            items: []
          },
          router: {
            routes: []
          },
          config: {}
        };

        render(createElement(App), container);
    
        const rootContainer = container._reactRootContainer;
        const currentFiber = rootContainer._internalRoot.current;

        let node = currentFiber;

        while (true) {
          switch (node.elementType) {
            
            case Application: {
              context.config = node.memoizedProps.config;
              break;
            }
        
            case Route: {
              context.router.routes.push({
                path: node.memoizedProps.path,
                component: node.memoizedProps.component 
              });
              break;
            }
        
            case TabBar: {
              break;
            }
        
            case TabBarItem: {
              context.tabBar.items.push({
                icon: node.memoizedProps.icon,
                selectedIcon: node.memoizedProps.selectedIcon,
                path: node.memoizedProps.path,
                text: node.memoizedProps.children
              });
              break;
            }
          }
      
          if (!isNullOrUndefined(node.child)) {
            node = node.child;
            continue;
          }
      
          while (isNullOrUndefined(node.sibling)) {
            if (isNullOrUndefined(node.return)) {
              return context;
            }
      
            node = node.return;
          }
      
          node = node.sibling;
        }            
      }
    });
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
}
