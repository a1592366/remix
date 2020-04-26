import React from '../react';
import ReactDOM from '../renderer';
import { Application, TabBar } from '../components';
import { Route } from '../router';
import terminal from './runtime/terminal';
import logic from './runtime/logic';
import env from '../../env';

const { TabBarItem } = TabBar;

export const getApplication = () => {
  return Program.context;
}

export default class Program {
  constructor (App, container) {
    Program.context = this;

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

        ReactDOM.render(React.createElement(App), container);
    
        const rootContainer = container._reactRootContainer;
        const currentFiber = rootContainer.internalRoot.workInProgress;

        let node = currentFiber;

        while (true) {
          switch (node.elementType) {
            
            case Application: {
              context.config = node.memoizedProps.config;
              this.instance = node.stateNode;
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
              context.tabBar = {
                ...node.memoizedProps,
                ...context.tabBar
              }
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
      
          if (node.child) {
            node = node.child;
            continue;
          }
      
          while (!node.sibling) {
            if (node.return) {
              return context;
            }
      
            node = node.return;
          }
      
          node = node.sibling;
        }            
      }
    });
  }

  start () {
    if (env.isDevToolRuntime) {
      devtool(this.context, this.instance);
    } else {
      terminal(this.context, this.instance);
    }
  }
}