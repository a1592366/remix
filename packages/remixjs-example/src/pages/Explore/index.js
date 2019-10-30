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
    current: 'movies'
  }


  onChange = (key) => {
    this.setState({
      current: key
    })
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
            <View className="index__movies">
              <View className="index__movies-card">
                <View className="index__movies-card-thumb">
                  <Image onTouchStart={() => {}} className="index__movies-card-image" />
                </View>

                <View className="index__movies-card-title">
                  构造设计引擎，释放设计能力
                </View>
              </View>
            </View>
          </Menus.Item>

          <Menus.Item name="行程" key="schedule">
            <View className="index__schedule"></View>
          </Menus.Item>

          <Menus.Item name="关于" key="about">
            <View className="index__about"></View>
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