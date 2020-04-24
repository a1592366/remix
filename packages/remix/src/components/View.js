import React from '../react';
import Component from '../react/Component';
import PropTypes from '../react/PropTypes';

export default class View extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onClick: PropTypes.func,
    onTap: PropTypes.func,
    onPress: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchEnd: PropTypes.func
  }

  static defaultProps = {
    style: null,
    className: null,
    onPress: null,
    onLongPress: null,
    onClick: null,
    onPress: null,
    onTap: null,
    onTouchStart: null,
    onTouchMove: null,
    onTouchEnd: null,
  }

  render () {
    return (
      <view {...this.props.children}>{this.props.children}</view>
    )
  }
}