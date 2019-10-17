import { isNullOrUndefined } from '../shared/is';
import React from '../react';
import cloneElement from '../react/cloneElement';
import Component from '../react/Component';
import PropTypes from '../react/PropTypes';
import { forEach } from '../react/Children';
import notification, { APPLICATION } from '../project/notification';
import { Router } from '../router';
import TabBar from './TabBar';

export default class Application extends Component {
  static propTypes = {};
  static defaultProps = {};

  componentWillMount () {
    notification.on(APPLICATION, this.onApplicationLifecycle);
  }

  componentWillUnMount () {
    notification.off(APPLICATION, this.onApplicationLifecycle);
  }

  onApplicationLifecycle = ({ type }) => {
    switch (type) {
      case LEVEL.APPLICATION.LAUNCH:
    }
  }
  
  cloneApplicationChildren () {
    const children = [];
    
    forEach(this.props.children, (child) => {
      if (!isNullOrUndefined(child)) {
        const { type } = child;
        if (type === Router || type === TabBar) {
          children.push(child);
        }
      }
    });

    return children;
  }

  render () {
    return (
      <view>{this.cloneApplicationChildren()}</view>
    );
  }
}