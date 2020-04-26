import ViewController from './ViewController';
import { document } from '../../document';

const lifecycleTypes = {
  ATTACHED: 'attached',
  DETACHED: 'detached'
};

export default class ViewManager {
  constructor (context) {
    this.context = context;
    this.viewControllers = {};
    this.views = {};

    transports.view.onLoad(this.onLoad);
    transports.view.onReady(this.onReady);
    transports.view.onLifecycle(this.onLifecycle);
  }

  get routes () {
    if (this.__routes__) {
      return this.__routes__;
    }

    const routes = this.__routes__ = {};
    const router = this.context.router;

    router.routes.forEach(r => {
      routes[r.path] = r;
    });

    return routes;
  }

  onLifecycle = (type, id, parentId, view) => {
    switch (type) {
      case lifecycleTypes.ATTACHED: {
        this.views[id] = view;
        const element = document.findElement(id);

        console.log(element.className, id);
        if (element) {
          // console.log(element, id);
          element.binding = () => {
            const uuid = element.return.uuid;
            const child = element.return.serialize();
            const view = this.views[uuid];

            if (view) { view.postMessage(child);}
          }
        }

        break;
      } 

      case lifecycleTypes.DETACHED: {
        this.views[id] = null;
        const element = document.findElement(id);

        if (element) {
          element.binding = null;
        }

        break;
      }
    }


  }

  onReady = () => {

  }

  onLoad = ({ id, route, query }, callback) => {
    let viewController = this.viewControllers[id];
    
    if (viewController) {
      viewController.onLoad(query, callback);
    } else {
      const r = this.routes[route];
  
      if (r) {
        this.viewControllers[id] = viewController = new ViewController(id, r)

        viewController.onLoad(query, callback);
      } else {
        logger.red(`Can not find route!`);
      }
    }

  }
}