import React from '../react';
import * as Children from '../react/Children';
import { Router } from '../router';
import TabBar from './TabBar';

export default function Application (props) {
  const cloneApplicationChildren = () => {
    const children = [];
    
    Children.forEach(props.children, (child) => {
      if (child !== null) {
        const { type } = child;
        if (type === Router || type === TabBar) {
          children.push(child);
        }
      }
    });

    return children;
  }

  return cloneApplicationChildren();
}

