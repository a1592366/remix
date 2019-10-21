import ViewController from './ViewController';
import { render } from '../../renderer';
import { document } from '../../document';
import createElement from '../../react/createElement';
import transports, { VIEW } from './transports';

export default class ViewManager {
  constructor (context) {
    this.context = context;
    this.viewControllers = {};

    transports.view.on(this.onMessage);
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

  onMessage = (type, argv) => {
    debugger;
    if (type === VIEW.LOAD) {

    }

    debugger;
    switch (type) {
      case VIEW.LOAD: {
        this.onLoad(...argv);
      }
    }
  }

  onLoad = ({ route, id }, query, callback) => {
    let viewController = this.viewControllers[id];
    
    if (viewController) {
      viewController.onLoad();
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