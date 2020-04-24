import { getApplication } from './application';
import message from '../message';
import { getComponentManager } from './component';

const inWx = typeof wx === 'object' && wx.getSystemInfo;

const { 
  level: { COMMON },
  types: { CALLBACK, SELECTOR_IN, SELECTOR_DEFAULT }, 
  status: { SUCCESS, ERROR } 
} = message;

class Selector {
  constructor (id, actions, selectorId, callbackId) {
    this.id = id;
    this.actions = actions;
    this.callbackId = callbackId;
    this.selectorId = selectorId;

    this.createSelector();
  }

  createSelectorQuery () {
    if (inWx) {
      const query = wx.createSelectorQuery().in(getComponentManager().getComponentById(this.id));

      return this.query = query;
    }
  }

  createSelector () {
    if (inWx) {
      const query = this.createSelectorQuery();

      this.selector = query.select(this.selectorId);
      this.actions.forEach(action => {
        const { name, argv } = action;

        this.selector[name](...argv);
      });

      return this.selector;
    }
  }

  exec = () => {
    if (inWx) {
      this.query.exec((res) => {
        getApplication().worker.postMessage({
          level: COMMON,
          type: CALLBACK,
          callbackId: this.callbackId,
          argv: [res]
        });
      })
    }
  }
}

export default function ({ id, callbackId, selectorId, actions }) {
  const sel = new Selector(id, actions, selectorId, callbackId);

  sel.exec();
}