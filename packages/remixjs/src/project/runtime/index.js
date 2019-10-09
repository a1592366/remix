import { message } from '@expri/worker';
import { flushMount } from '@expri/exprijs/src/core/lifecycle';
import DSL from '@expri/exprijs/src/core/dsl';
import { isFunction } from '@expri/exprijs/src/utils';
import EventEmitter from 'events';
import { createInstance, getCurrentRendered } from '../instance';
import { getWorker } from './worker';
import Event from './event';

const { assign } = Object;
const noop = function () {};

const pageMethods = {
  VIEW_DID_APPEAR: 'viewDidAppear',
  VIEW_WILL_DISPPEAR: 'viewWillDisppear',
  VIEW_WILL_DESTROY: 'viewWillDestroy', 
}

class Runtime extends EventEmitter {
  constructor (project) {
    super();

    this.project = project;
    this.cache = {};

    this.createWorker();
  }

  createWorker () {
    this.worker = getWorker();

    this.worker.on(message.level.APPLICATION, this.onApplication);
    this.worker.on(message.level.PAGE, this.onPage);
    this.worker.on(message.level.COMPONENT, this.onComponent);

    this.on('applicationlifecycle', this.onApplicationLifecycle);
    this.on('pagelifecycle', this.onPageLifecycle);
    this.on('componentlifecycle', this.onComponentLifeCycle);
    this.on('pageload', this.onPageLoad);
    this.on('pageready', this.onPageReady);
    this.on('pageshow', this.onPageShow);
    this.on('pagehide', this.onPageHide);
    this.on('pageunload', this.onPageUnload);
    this.on('pageevent', this.onPageEvent);
    this.on('componentevent', this.onComponentEvent);
    this.on('componentattached', this.onComponentAttached);
    this.on('componentdetached', this.onComponentDetached);
  }

  onApplication = ({ type, ...others }) => {
    switch (type) {
      case message.types.LIFECYCLE:
        this.emit('applicationlifecycle', others);
        break;
    }
  }

  onApplicationLifecycle = ({ name, argv }) => {
    const { application } = this.project;
    const method = application[name];

    if (isFunction(method)) {
      method.apply(application, argv);
    }
  }

  onPage = ({ type, ...others }) => {
    switch (type) {
      case message.types.LIFECYCLE:
        this.emit('pagelifecycle', others);
        break;

      case message.types.EVENT:
        this.emit('pageevent', others);
        break;
    }
  }

  onPageLifecycle = ({ name, ...others }) => {
    this.emit(`page${name.toLowerCase()}`, others);
  }

  onPageReady = () => {
    flushMount();
  }

  onPageLoad = ({ argv, callbackId }) => {
    const data = argv[0];
    const node = createInstance(data);

    if (callbackId) {
      worker.postMessage({
        level: message.level.COMMON,
        type: message.types.CALLBACK,
        name: callbackId,
        argv: [node]
      });
    }
  }

  onPageShow = ({ argv }) => {
    const component = this.getCurrentPageComponent(argv, pageMethods.VIEW_DID_APPEAR);

    if (component) {
      component[pageMethods.VIEW_DID_APPEAR]();
    }
  }

  onPageHide = ({ argv }) => {
    const component = this.getCurrentPageComponent(argv, pageMethods.VIEW_WILL_DISPPEAR);

    if (component) {
      component[pageMethods.VIEW_WILL_DISPPEAR]();
    }
  }

  onPageUnload = ({ argv }) => {
    const component = this.getCurrentPageComponent(argv, pageMethods.VIEW_WILL_DESTROY);

    if (component) {
      component[pageMethods.VIEW_WILL_DESTROY]();
    }
  }

  onPageEvent = ({ argv, name }) => {    
    const component = this.getCurrentPageComponent(argv, name);

    if (component) {
      component[name]();
    }
  }

  onComponent = ({ type, ...others }) => {
    switch (type) {
      case message.types.LIFECYCLE:
        this.emit('componentlifecycle', others);
        break;

      case message.types.EVENT:
        this.emit('componentevent', others);
        break;
    }
  }

  onComponentEvent = ({ argv }) => {
    const data = argv[0];
    const { route, event, name } = data;
    
    Event.create(route, event, name);
  }

  onComponentLifeCycle = ({ name, ...others }) => {
    this.emit(`component${name.toLowerCase()}`, others);
  }

  onComponentAttached ({ argv }) {
    const [ route, id, nid ] = argv;
    const { dsl } = getCurrentRendered(route);
    const node = dsl.search(nid);

    if (node.type === DSL.types.COMPONENT) {
      if (node) {
        const { owner } = node;
  
        owner.__wxExparserNodeId__ = id;
        owner.__nodeId__ = nid;
        owner.__route__ = route;
        owner.__asyncUpdate__ = this.asyncComponentUpdate;
      }
    } else {
      const { vnode } = node;

      if (vnode._owner) {
        vnode._owner.__wxExparserNodeId__ = id;
      }
    }
  }

  onComponentDetached ({ argv }) {
    const [ route, id, nid ] = argv;
    const rendered = getCurrentRendered(route);
    
    if (rendered) {
      const { dsl } = rendered;
      const node = dsl.search(nid);

      if (node) {
        const { owner } = node;

        owner.__wxExparserNodeId__ = null;
      }
    }
  }

  getCurrentPageNodeOwner (node, name) {
    const { owner, children } = node;

    if (owner[name]) {
      return owner;
    } else {
      if (children && children.length === 1) {
        return this.getCurrentPageNodeOwner(children[0], name);
      }
    }
  }

  getCurrentPageComponent (argv, name) {
    const data = argv[0];
    const { route } = data;

    if (this.cache[route]) {
      const component = this.cache[route];
      
      if (component[name]) {
        return component;
      }
    }

    const rendered = getCurrentRendered(route);  

    if (rendered) {
      const { node } = rendered.dsl;
      
      if (node) {
        const owner = this.getCurrentPageNodeOwner(node, name);

        if (owner) {
          return this.cache[route] = owner;
        }
      }
    }
  }

  asyncComponentUpdate (vnode, callback = noop) {
    const { 
      __route__: route,  
      __nodeId__: nodeId,
      __wxExparserNodeId__: id
    } = this;

    const rendered = getCurrentRendered(route);
    
    if (rendered) {
      const node = rendered.dsl.search(nodeId);

      if (node) {
        const { owner, parent } = node;
        const newNode = DSL.createElement(
          Number(nodeId[nodeId.length -1]) - 1, 
          vnode,
          parent, 
          owner
        );

        newNode.key = newNode.id = nodeId;

        assign(node, newNode);
        // const { children } = newNode.serialize();

        getWorker().postMessage({
          level: message.level.COMPONENT,
          type: message.types.EVENT,
          name: 'update',
          argv: [id, newNode.serialize()]
        }, () => {
          callback();
        });
      }
    }
  }

}

export default Runtime;