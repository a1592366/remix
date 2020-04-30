import React from '../../../react';
import PropTypes from '../../../react/PropTypes';

import EventHandle from '../EventHandle';

class <%- name %> extends EventHandle {
  static propTypes = {
    <%- propTypes %>
  }

  static defaultProps = {
    <%- defaultProps %>
  }

  render () {
    const {
      <%- thisProps %>
    } = this.props;

    return (
      <<%- tagName %> <%- props %> >
        {this.props.children}
      </<%- tagName %>>
    );
  }
}

export default <%- name %>;
