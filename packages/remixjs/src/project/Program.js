import React from '../react';
import ReactDOM from '../react';
import { Application, TabBar } from '../components';
import { Route } from '../router';
import terminal from './runtime/terminal';
import logic from './runtime/logic';
import env from '../../env';

const { TabBarItem } = TabBar;
const { getOwnPropertyNames } = Object;

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
          tabBar: { items: [] },
          router: { routes: [] },
          config: {}
        };

        const vnode = ReactDOM.render(React.createElement(App), container);
        let node = vnode;

        while (true) {
          const cache = node.cache;
          const keys = getOwnPropertyNames(cache);

          keys.forEach(key => {
            const inst = cache[key];

            if (inst instanceof Application) {
              context.config = inst.props.config;
              this.instance = inst; 
            } else if (inst instanceof Route) {
              context.router.routes.push({
                path: inst.props.path,
                component: inst.props.component 
              }); 
            } else if (inst instanceof TabBar) {
              context.tabBar = {
                ...node.props,
                ...context.tabBar
              }
            } else if (inst instanceof TabBarItem) {
              debugger;
              context.tabBar.items.push({
                icon: inst.props.icon,
                selectedIcon: inst.props.selectedIcon,
                path: inst.props.path,
                text: inst.props.children
              });
            }
          });

          if (node.child) {
            node = node.child;
            continue;
          }
      
          while (!node.sibling) {
            if (!node.return) {
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
      logic(this.context, this.instance);
    } else {
      terminal(this.context, this.instance);
    }
  }
}
