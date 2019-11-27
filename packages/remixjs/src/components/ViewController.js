import React from '../renderer';
import Component from '../react/Component';
import PropTypes from '../react/PropTypes';
import { cloneElement } from '../react/createElement';
import notification, { APPLICATION, VIEW } from '../project/notification';

const { defineProperty } = Object;

export default class ViewController extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor (props, context) {
    super(props, context);
  }

  render () {
    throw new Error(`Must be implatated`);
  }
}