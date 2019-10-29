import React from '../../../react';
import PropTypes from '../../../react/PropTypes';
<% if (name === 'swiper') {%>import SwiperItem from '../remix-swiper-item/index';<% } %>

export default class <%= className %> extends React.Component {
  <% if (name === 'swiper') {%>static SwiperItem = SwiperItem; <% } %>
  static propTypes = {
    <%= propTypes %>
  };

  static defaultProps = {
    <%- defaultProps %>
  };

  <%- events %>

  render () {
    const { <%= properties %> } = this.props;

    return <<%= tagName %> <%- props %>><% if (openComponent) { %>{this.props.children}<% } %></<%= tagName %>>;
  }
}


