

import { message } from '@expri/worker';
import gud from 'gud';
import { getWorker } from '../worker';

const { 
  level: { API, SELECTOR }, 
  types: { SELECTOR_IN, SELECTOR_DEFAULT, SELECTOR_CONTEXT } 
} = message;

const noop = () => {};

class Selector {
  constructor (vnode) {
    this.vnode = vnode;
    this.actions = [];
  }

  in (ctx) {
    this.actions.push({
      type: SELECTOR_IN,
      name: 'in',
      argv: [ctx]
    });

    return this;
  }

  select (id) {
    this.selectorId = id;

    return this;
  }

  boundingClientRect () {
    this.actions.push({
      type: SELECTOR_DEFAULT,
      name: 'boundingClientRect',
      argv: []
    });

    return this;
  }

  scrollOffset () {
    this.actions.push({
      type: SELECTOR_DEFAULT,
      name: 'scrollOffset',
      argv: []
    });

    return this;
  }

  context () {
    this.actions({
      type: SELECTOR_CONTEXT,
      name: 'context',
      argv: [],
    });

    return this;
  }

  exec (callback = noop) {

    
    return new Promise((resolve, reject) => {
      if (this.vnode) {
        const { _owner: owner } = this.vnode;
        debugger;
        const { __wxExparserNodeId__ } = owner;

        if (!__wxExparserNodeId__) {
          reject(new Error('Component was not mounted yet'));
        } else {
          getWorker().postMessage({
            level: SELECTOR,
            selectorId: this.selectorId,
            actions: this.actions,
            id: __wxExparserNodeId__
          }, (res) => {
            callback(res);
    
            resolve(res);
          });  
        }
      }
    });
  }
}

export function createSelectorQuery (vnode) {

  return new Selector(vnode);
}
