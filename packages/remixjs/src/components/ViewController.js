import { isNullOrUndefined } from '../shared/is';
import React from '../react';
import cloneElement from '../react/cloneElement';
import Component from '../react/Component';
import PropTypes from '../react/PropTypes';
import notification, { APPLICATION, VIEW } from '../project/notification';

export default class ViewController extends Component {
  static propTypes = {};
  static defaultProps = {};

  set config (config) {
    debugger;
  }

  set viewWillAppear (viewWillAppear) {

  }

  set viewWillDisapear (viewWillDisapear) {

  }

  set componentWillUnMount (componentWillUnMount) {
    this.componentWillUnMount = () => {
      componentWillUnMount.call(this);

      notification.off(VIEW);
    }
  }

  render () {
    return (
      <view>{this.cloneApplicationChildren()}</view>
    );
  }
}