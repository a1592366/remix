import React from '../react';
import Component from '../react/Component';

export default class Router extends Component {
  render () {
    return (
      <view>
        {this.props.children}
      </view>
    );
  }
}