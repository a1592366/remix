import React, { Component } from 'react';
import { ScrollView, View, Image, Text, Button, Map, Picker, Swiper, Video } from 'remixjs/components';
import { ViewController } from 'remixjs/components';

import Menus from './components/Menus';
import Card from './components/Card';

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
        <Video 
          loop
          autoplay
          objectFit
          controls={false}
          showPlayButton={false}
          showCenterPlayButton={false}
          showProgress={false}
          showMuteButton={false}
          className="index__video" 
          src="http://f.video.weibocdn.com/001Npztxlx07y7EjSeUg01041200g3Xe0E010.mp4?label=mp4_hd&template=852x480.25.0&trans_finger=62b30a3f061b162e421008955c73f536&Expires=1572458748&ssig=KGBVxAVrS0&KID=unistore,video" />
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
              <Card 
                name="少年的你"
                cover={'https://p1.meituan.net/movie/7b437e3a0d08d10e374ddc34f71b88fe3379132.jpg'} 
                tags={['爱情', '青春', '剧情']} 
                like={`10万`}
              />

              <Card 
                name="终结者：黑暗命运"
                cover={'http://p1.meituan.net/movie/b932f7f678a3e28763b3b281b3e120ef13622509.jpg'} 
                tags={['动作', '科幻', '冒险']} 
                like={`50万`}
              />
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