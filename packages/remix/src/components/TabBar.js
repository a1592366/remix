import React from '../react';
import Component from '../react/Component';
import PropTypes from '../react/PropTypes';
import { useComponent } from '../hooks';

class TabBarItem extends Component {
  static propTypes = {
    path: PropTypes.string,
    icon: PropTypes.string,
    selectedIcon: PropTypes.string,
    children: PropTypes.string
  }

  render () {
    return <view>{this.props.children}</view>
  }
}

class TabBar extends Component {
  static TabBarItem = useComponent(TabBarItem);
  static propTypes = {
    color: PropTypes.string,
    selectedColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderStyle: PropTypes.oneOf(['black', 'white']),
    position: PropTypes.oneOf(['bottom', 'top']),
    custom: PropTypes.bool
  }

  static defaultProps = {
    position: 'bottom',
    bottom: false
  }
  
  render () {
    return <tabbar>{this.props.children}</tabbar>
  }
}

export default useComponent(TabBar);