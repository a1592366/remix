import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import { View } from 'remixjs/components';

import './index.css';

const Item = function () {}

export default class Menus extends Component {
  static Item = Item;

  state = {
    current: this.props.current || this.getCurrentActiveKey()
  }

  getCurrentActiveKey = () => {

  }

  onMenuItemClick = () => {

  }

  headerRender () {
    const children = [];
    
    Children.forEach(this.props.children, (child) => {
      if (child) {
        if (child.type === Menus.Item) {
          const { props, key } = child;

          children.push(
            <View className="index__menu-item-tab" key={key} onTap={(e) => this.onMenuItemClick(child, e)}>
              {props.name}
            </View>
          );
        }
      }
    });
  
    return <View className="index__menus-tabs">{children}</View>
  }

  contentRender () {
    const children = [];
    
    Children.forEach(this.props.children, (child) => {
      if (child) {
        if (child.type === Menus.Item) {
          const { props, key } = child;

          children.push(
            <View className="index__menu-item-content" key={key} onTap={(e) => this.onMenuItemClick(child, e)}>
              {props.name}
            </View>
          );
        }
      }
    });
  
    return <View className="index__menus-content">{children}</View>
  }

  render () {
    return (
      <View className="index__menus">
        {this.headerRender()}
        {this.contentRender()}
      </View>
    );
  }
}