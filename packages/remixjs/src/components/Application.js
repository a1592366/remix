import { isNullOrUndefined } from '../shared/is';
import React from '../react';
import cloneElement from '../react/cloneElement';
import Component from '../react/Component';
import PropTypes from '../react/PropTypes';
import { forEach } from '../react/Children';

import { Router, Route } from '../router';

export default class Application extends Component {
  
  cloneApplicationChildren () {
    const children = [];

    debugger;
    
    forEach(this.props.children, (child) => {
      if (!isNullOrUndefined(child)) {
        if (child.type === Router) {
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