import React, { Component } from '../../react';
import PropTypes from '../../react/PropTypes';


class EventHandle extends Component {}

export default EventHandle;

new Proxy(EventHandle.prototype, {
  get () {  }
});
  