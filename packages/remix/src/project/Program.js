import React from '../react';
import ReactDOM from '../renderer';
import { Application, TabBar } from '../components';
import { Route } from '../router';
import run from './runtime';

let CurrentProgram = null;
const { TabBarItem } = TabBar;

const next = (node) => {
  if (node.child) {
    return node = node.child;
  }

  while (node.sibling === null) {
    if (node.return === null) { 
      return null; 
    }

    node = node.return;
  }

  return node = node.sibling;
}

export const getApplication = () => {
  return CurrentProgram;
}

export default function (App, container) {
  let context = null;

  return CurrentProgram = {
    start () {
      console.log(this.context)
      run(this.context, this.instance);
    },
    get currentFiber () {
      ReactDOM.render(
        React.createElement(App), 
        container
      );
  
      const rootContainer = container._reactRootContainer;
      const currentFiber = rootContainer.internalRoot.workInProgress;

      return currentFiber;
    },
    get context () {
      if (context) { 
        return context; 
      }

      context = {
        tabBar: { items: [] },
        router: { routes: [] },
        config: {}
      };

      let node = this.currentFiber;

      while (node) {
        const { elementType } = node;

        if (elementType) {
          if (elementType === Application) {
            context.config = node.memoizedProps.config;
            this.instance = node.stateNode;
          } else if (elementType === Route) {
            context.router.routes.push({
              path: node.memoizedProps.path,
              component: node.memoizedProps.component 
            });
          } else if (elementType === TabBar) {
            context.tabBar = {
              ...node.memoizedProps,
              ...context.tabBar
            }
          } else if (elementType === TabBarItem) {
            const { icon, selectedIcon, path } = node.memoizedProps;
            const text = node.memoizedProps.text || node.memoizedProps.children;

            context.tabBar.items.push({ icon, selectedIcon, path, text });
          }
        }

        node = next(node);
      }

      return context;
    }
  }
}
