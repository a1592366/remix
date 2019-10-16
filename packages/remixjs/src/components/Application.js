import { isNullOrUndefined } from '../shared/is';
import React from '../react';
import cloneElement from '../react/cloneElement';
import Component from '../react/Component';
import PropTypes from '../react/PropTypes';
import { forEach } from '../react/Children';

import TabBar from './TabBar';
import { Router } from '../router';

export default class Application extends Component {
  
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