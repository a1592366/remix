import { isNullOrUndefined } from '../shared/is';
import { noop } from '../shared';
import React from '../react';
import cloneElement from '../react/cloneElement';
import Component from '../react/Component';
import PropTypes from '../react/PropTypes';
import { forEach } from '../react/Children';
import { transports, APPLICATION } from '../project';
import { Router } from '../router';
import TabBar from './TabBar';

export default class Application extends Component {
  static propTypes = {
    onLaunch: PropTypes.func
  };

  static defaultProps = {
    onLaunch: noop
  };

  componentWillMount () {
    transports.app.on(this.onMessage);
  }

  componentWillUnMount () {
    transports.app.off(this.onMessage);
  }

  onMessage = (type, argv) => {
    switch (type) {
      case APPLICATION.LAUNCH: {
        const { onLaunch } = this.props;

        onLaunch.apply(this, argv);
        break;
      }


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