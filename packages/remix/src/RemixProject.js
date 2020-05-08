import React from './Remix';
import render from './RemixRenderer';
import runApplication from './RemixRuntime';
import * as Support from './RemixViewSupport';

import { Application, TabBar, Route } from './RemixComponents';

let viewId = 0;
const { TabBarItem } = TabBar;
const { Subscriber, Publisher } = Support;

function nextFiber (node) {
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

export const RemixApplication = { current: null }

export function Program (App, container) {
  let context = null;

  return RemixApplication.current = {
    start () {
      runApplication(this.context, this.instance);
    },

    get currentFiber () {
      render(
        React.createElement(App), 
        container
      );
  
      const { current: currentFiber } = container.__internalRoot;

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
            if (!node.memoizedProps.component.__remix__) {
              console.warn(`<Route path='${node.memoizedProps.path}' /> 路由组件请使用 useController 包装，否则无法读取页面配置文件`);
            }

            context.router.routes.push({
              path: node.memoizedProps.path,
              component: node.memoizedProps.component,
              config: node.memoizedProps.component.config || {}
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

        node = nextFiber(node);
      }

      return context;
    }
  }
}

export function View (route, element = null) {
  const view = { id: `rc.${viewId++}`, route };

  if (typeof Page === 'function') {
    Page({
      data: { type: null, element },
      onLoad (query) {
        Subscriber.on(
          `${Support.DATA}.${view.id}`, 
          (id, element) => {
            
            if (id === view.id) {
              this.setData({ type: 'SYNC', element })
            }
        });

        Publisher.Load({ ...view, query });
      },
      onShow () {
        Publisher.Show(view);
      },
      onUnload () {
        Subscriber.off(`${Support.DATA}.${view.id}`);
      }
    })
  } else {
    throw new Error('请在微信小程序环境下运行');
  }
}
