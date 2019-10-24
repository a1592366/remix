import ViewController from './ViewController';
import { render } from '../../renderer';
import { document } from '../../document';
import createElement from '../../react/createElement';
import { logicTransports, VIEW } from './transports';

const transports = logicTransports;

export default class ViewManager {
  constructor (context) {
    this.context = context;
    this.viewControllers = {};

    transports.view.onLoad(this.onLoad);
    transports.view.onReady(this.onReady);
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
        // logger.red(`Can not find route!`);
      }
    }

  }
}