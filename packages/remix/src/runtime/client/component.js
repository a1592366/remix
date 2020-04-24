import { getApplication } from './application';
import message from '@expri/worker/src/message';
import EventEmitter from 'events';

const { level: { COMPONENT, COMMON }, types: { EVENT, CALLBACK } } = message;
const inWx = typeof wx === 'object' && wx.getSystemInfo;

class ComponentManager extends EventEmitter {
  constructor () {
    super();
    this.stores = {};

    this.worker = getApplication().worker;
    this.registerEvents();
  }

  registerEvents = () => {
    this.worker.on(COMPONENT, this.onComponent);
    this.on('componentevent', this.onComponentEvent);
    this.on('componentupdate', this.onComponentUpdate);
  }

  onComponent = ({ type, ...others }) => {
    switch (type) {
      case EVENT:
        this.emit('componentevent', others);
        break;
    }
  }

  onComponentEvent = ({ name, ...others }) => {
    this.emit(`component${name.toLowerCase()}`, others);
  }

  onComponentUpdate = ({ argv , callbackId }) => {
    const [id, node] = argv;

    if (inWx) {
      const route = this.getCurrentRoute();
      const store = this.stores[route];

      if (store) {
        const component = store[id];
        
        wx.nextTick(() => {
          component.setData({ node }, () => {
            this.worker.postMessage({
              level: COMMON,
              type: CALLBACK,
              callbackId,
              argv: []
            });
          });
        });
      }
    }
  }

  getCurrentRoute () {
    const pages = getCurrentPages();
    const current = pages[pages.length - 1];

    if (current) {
      return current.route;
    }
  }

  attached (component) {
    const { data, __wxExparserNodeId__, __wxWebviewId__ } = component;
    const route = this.getCurrentRoute();
    const { worker } = getApplication();
    const { node, nodeId } = data;
    const id = node ? node.id : nodeId;

    worker.postMessage({
      level: message.level.COMPONENT,
      type: message.types.LIFECYCLE,
      name: 'attached',
      argv: [route, __wxExparserNodeId__, id, __wxWebviewId__ ]
    });

    const store = this.stores[route] || (this.stores[route] = {});
    store[__wxExparserNodeId__] = component;
  }

  detached (component) {
    const { data, __wxExparserNodeId__, __wxWebviewId__ } = component; 
    const route = this.getCurrentRoute();
    const { worker } = getApplication();
    const { node, nodeId } = data;
    const id = node ? node.id : nodeId;
    

    worker.postMessage({
      level: message.level.COMPONENT,
      type: message.types.LIFECYCLE,
      name: 'detached',
      argv: [route, __wxExparserNodeId__, id, __wxWebviewId__ ]
    });

    const store = this.stores[route] || (this.stores[route] = {});
    store[__wxExparserNodeId__] = null;
  }

  getComponentById (id) {
    const route = this.getCurrentRoute();
    const stores = this.stores[route];

    if (stores) {
      return stores[id];
    }
  }
}

let component;

export function getComponentManager () {
  return component || (component = new ComponentManager());
}
