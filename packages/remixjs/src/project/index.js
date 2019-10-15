import { createElement } from '../react';
import { render } from '../renderer';
import { document } from '../document';

import { Application, TabBar } from '../components';
import Router, { Route } from '../router';


export default class MiniProgram {
  constructor (Application, container) {
    MiniProgram.context = this;

    this.renderApplication(Application, container);
    this.getApplicationContext(this.rendered);
    this.getApplicationInstance();
    this.registerApplication();
  }

  renderApplication (Application, container) {
    this.rendered = render(createElement(Application), container || document.body);
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


  getApplicationContext = () => {
    
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

export const getApplicationContext = () => {
  return MiniProgram.context;
}
