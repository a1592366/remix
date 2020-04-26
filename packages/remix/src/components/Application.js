import React from '../react';
import { cloneElement } from '../react/createElement';
import Component from '../react/Component';
import PropTypes from '../react/PropTypes';
import * as Children from '../react/Children';
// import { transports, APPLICATION } from '../project';
import { Router } from '../router';
import TabBar from './TabBar';

export default class Application extends Component {
  static propTypes = {
    onLaunch: PropTypes.func
  };

  static defaultProps = {
    onLaunch: () => {}
  };

  componentWillMount () {
    // transports.app.on(this.onMessage);
  }

  componentWillUnMount () {
    // transports.app.off(this.onMessage);
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
    
    Children.forEach(this.props.children, (child) => {
      if (child !== null) {
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