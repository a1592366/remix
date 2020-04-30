import React from '../react';
import Component from '../react/Component';
import Route from './Route';
import { useComponent } from '../hooks';

class Router extends Component {
  static Route = Route;

  render () {
    return (
      <router>
        {this.props.children}
      </router>
    );
  }
}

export default useComponent(Router);