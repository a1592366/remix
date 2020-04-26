import React from '../react';
import Component from '../react/Component';
import Route from './Route';

export default class Router extends Component {
  static Route = Route;

  render () {
    return (
      <view>
        {this.props.children}
      </view>
    );
  }
}