import React, { Component } from 'react';
import { ScrollView, View, Image, Text, Button, Map, Picker, Swiper } from 'remixjs/components';
import { ViewController } from 'remixjs/components';

import Menus from './components/Menus';

import './index.css';

export default class Index extends ViewController {
  config = {
    navigationBarTitleText: '我的'
  }
  
  state = {
    current: 'jx'
  }


  onChange = () => {

  }

  headerRender () {
    return (
      <View className="index__header">

      </View>
    );
  }


  contentRender () {
    const { current } = this.state;

    return (
      <View className="index__content">
        <Menus current={current} onChange={this.onChange}>
          <Menus.Item name="影片" key="movies">
          </Menus.Item>

          <Menus.Item name="行程" key="schedule">
          </Menus.Item>

          <Menus.Item name="关于" key="about">
          </Menus.Item>
        </Menus>
      </View>
    );
  }

  render () {
    return (
      <View className="index">
        {this.headerRender()}
        {this.contentRender()}
      </View>
    );
  }
}