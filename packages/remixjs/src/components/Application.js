
import React from '../react';
import Component from '../react/Component';
import PropTypes from '../react/PropTypes';

import View from './View';

export default class Application extends Component {
  render () {
    return (
      <View>{this.props.children}</View>
    );
  }
}