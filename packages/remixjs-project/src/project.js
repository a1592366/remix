import { Application, TabBar } from '@expri/components';
import Router, { Route } from '@expri/router';
import { getApplicationInstance } from './instance';

const { TabBarItem } = TabBar;

export const getApplicationContext = () => {
  return Project.context;
}

export default class Project {
  constructor (vnode) {
    this.vnode = vnode;
  
    Project.context = this;
    
    this.getApplicationContext(this.vnode);
    this.getApplicationInstance();
    this.registerApplication();
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

getApplicationInstance () {
  this.instance = getApplicationInstance();
}


  getApplicationContext = ({ _rendered: rendered }) => {
    if (Array.isArray(rendered)) {
      return rendered.map(r => this.getApplicationContext({ _rendered: r }));
    }

    const { component, props, children, type } = rendered;
    const { children: c, ...others } = props;

    switch (type) {
      case Application:
        this.application = others;
        break;

      case TabBar:
        this.tabBar = { items: [], ...others };
        break;

      case TabBarItem:
        this.tabBar.items.push({ ...others, text: c.text });
        break;

      case Router:
        this.router = { routes: [], ...others }
        break;

      case Route:
        const { component } = others;
        const { configurations } = component;
        
        this.router.routes.push({
          ...others,
          configurations: {
            navigationBarTitleText: '页面标题',
            ...configurations,
            usingComponents: {
              section: '../../dsl/section',
              component: '../../dsl/component'
            }
          }
        });
        break;
    }

    if (component) {
      this.getApplicationContext(component);
    } else {
      const array = (Array.isArray(children) ? 
        children : [children]).filter(child => child);

      array.forEach(child => {
        if (child.component) {
          this.getApplicationContext({
            _rendered: child
          });
        }
      });
    }
  }

  json () {
    return {
      tabBar: this.tabBar,
      router: this.router,
      application: {
        configutations: this.application.configutations
      }
    }
  }
}