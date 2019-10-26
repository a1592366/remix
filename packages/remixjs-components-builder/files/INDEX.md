import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

export default class <%= className %> extends React.Component {
  static propTypes = {
    <%= propTypes %>
  };

  static defaultProps = {
    <%- defaultProps %>
  };

  render () {
    const { <%= properties %> } = this.props;

    return <<%= tagName %> <%- props %>><% if (openComponent) { %>{this.props.children}<% } %></<%= tagName %>>;
  }
}


