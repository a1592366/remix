import { createElement } from '@expri/exprijs';
import { render } from '@expri/exprijs';
import DSL from '@expri/exprijs/src/core/dsl';
import { getApplicationContext } from './project';


const callLifeMethod = (id, name) => {  
  const rendered = getCurrentRendered();
  const component = rendered.dsl.search(id);

  if (component) {
    const context = component.owner;
    const lifeMethod = context[name];

    if (isFunction(lifeMethod)) {
      lifeMethod.call(context);
    }
  }
}

class Instance {
  constructor (options = {}) {
    this.rendered = {};
    this.routes = {};
  }

  getComponent (route) {
    const current = this.routes[route];
    
    if (current) {
      return current;
    }
    
    const context = getApplicationContext();
    const { router } = context;

    router.routes.forEach(r => {
      this.routes[r.path] = r;
    });

    return this.getComponent(route);
  }

  getRendered (route) {
    return this.rendered[route];
  }  

  render (route, component, query) {
    const rendered = render(createElement(component, { route, query }));

    rendered.route = route;
    rendered.Class = component;

    this.rendered[route] = rendered;

    return rendered;
  }

  create (route, query) {
    const { component } = this.getComponent(route);

    return this.render(route, component, query);
  }
}


const instance = new Instance();

export function getApplicationInstance () {
  return instance;
}

export function updated (vnode) {
  const { node } = this.data;
  const { id } = node;
  const rendered = getCurrentRendered(); 
  const component = rendered.dsl.search(node.id);
  const { owner, parent } = component;
  const newNode = DSL.createElement(Number(id[id.length -1]) - 1, vnode, parent, owner);
  
  newNode.key = newNode.id = node.id;
  Object.assign(component, newNode);

  const json = newNode.serialize();

  node.children = json.children;
  
  this.setData({ node });
}


export function detached (callback = noop) {
  return function () {
    const { node } = this.data;
    const rendered = getCurrentRendered();
    const component = rendered.dsl.search(node.id);

    if (component) {
      callback(component, this);
    }
  }
}

export function createInstance (options = {}) {
  const rendered = instance.create(options.route, options.query);
  const node = rendered.dsl.json();

  return node;
}

export function getCurrentComponent (route) {
  return instance.getComponent(route);
}

export function getCurrentRendered (route) {
  return instance.getRendered(route);
}