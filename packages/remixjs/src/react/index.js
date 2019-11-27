
import Component from './Component'
import PureComponent from './PureComponent'
import createClass from './createClass'
import createElement, { isValidElement, cloneElement, createFactory } from './createElement'
import * as Children from './Children'
import * as ReactDOM from './ReactDOM'
import PropTypes from './PropTypes'
import DOM from './DOM'
import * as _ from './util'

let React = _.extend({
    version: '0.15.1',
    cloneElement,
    isValidElement,
    createElement,
    createFactory,
    Component,
    PureComponent,
    createClass,
    Children,
    PropTypes,
    DOM
}, ReactDOM);

React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOM;

export {
  PropTypes,
  Children,
  createElement,
  cloneElement,
  createFactory,
  Component
};

export const render = ReactDOM.render;

export default React;