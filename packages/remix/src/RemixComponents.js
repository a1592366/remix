import React, { Children, PropTypes } from './Remix';

export function Application (props) {
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

export function Router (props) {
  return (
    <router>
      {props.children}
    </router>
  )
}

export function Route () {}

Router.Route = Route;


export function TabBar (props) {
  return (
    <tabbar>
      {props.children}
    </tabbar>
  );
}

export function TabBarItem () {}

TabBar.TabBarItem = TabBarItem;
TabBar.propTypes = {
  color: PropTypes.string,
  selectedColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderStyle: PropTypes.oneOf(['black', 'white']),
  position: PropTypes.oneOf(['bottom', 'top']),
  custom: PropTypes.bool
}

TabBar.defaultProps = {
  position: 'bottom',
  bottom: false
}
