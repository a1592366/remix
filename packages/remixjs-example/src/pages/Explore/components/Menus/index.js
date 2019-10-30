import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { View, Text } from 'remixjs/components';

import './index.css';

const Item = function () {}

export default class Menus extends Component {
  static Item = Item;

  state = {
    activedKey: this.props.current
  }

  onMenuItemClick = (key) => {
    const { onChange } = this.props;

    if (key !== this.state.activedKey) {
      this.setState({
        activedKey: key
      }, () => {
        onChange(key)
      });
    }
  }

  headerRender () {
    const { activedKey } = this.state;
    const children = [];
    let activedIndex = 0;
    
    Children.forEach(this.props.children, (child, index) => {
      if (child) {
        if (child.type === Menus.Item) {
          const { props } = child;
          const key = props.key || child.key;
          const isActived = key === activedKey;

          if (isActived) {
            activedIndex = index;
          }

          const classes = classnames({
            'index__menu-item-tab': true,
            'index__menu-item-tab_active': isActived
          });

          children.push(
            <View className={classes} key={key} onTap={(e) => this.onMenuItemClick(key, e)}>
              <Text>{props.name}</Text>
            </View>
          );
        }
      }
    });


    const left = (activedIndex + 1) * (100 / (children.length * 2)) + '%';
  
    return (
      <View className="index__menus-tabs">
        <View className="index__menus-tabs-inner">
          {children}
        </View>
        <View className="index__menus-tabs-line" key="line" style={{ left }}></View>
      </View>
    )
  }

  contentRender () {
    const { activedKey } = this.state;
    const children = [];
    
    Children.forEach(this.props.children, (child) => {
      if (child) {
        if (child.type === Menus.Item) {
          const { props } = child;
          const key = props.key || child.key;
          const classes = classnames({
            'index__menu-item-content': true,
            'index__menu-item-content_active': key === activedKey
          });

          children.push(
            <View className={classes} key={key}>
              {props.children}
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