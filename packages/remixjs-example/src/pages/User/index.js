import React, { Component } from 'react';
import { ScrollView, View, Image, Text, Button, Map, Picker, Swiper } from 'remixjs/components';
import { ViewController } from 'remixjs/components';
import { transports } from 'remixjs/project';
import { API } from 'remixjs-message-protocol';

import './index.css';

export default class Index extends ViewController {
  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () {}

  render () {
    return (
      <ScrollView>
        <View className="test">
          <Image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572124226102&di=883185b2cb48a83c536e7f550913eba0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F19%2F20180119072554_fpope.jpg" />
          <Button className="button" plain onTouchStart={() => {}}>
            <Image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572124226102&di=883185b2cb48a83c536e7f550913eba0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F19%2F20180119072554_fpope.jpg" />
            T
            API
            OCT
          </Button>
            
          <View className="oh" >TouchMe!!!!</View>
          <Picker mode="date">
            OH
          </Picker>
          
          <Swiper duration={1000} interval={1000} indicatorDots>
            <Swiper.SwiperItem>
              <Image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572124226102&di=883185b2cb48a83c536e7f550913eba0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F19%2F20180119072554_fpope.jpg" />    
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <Image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572124226102&di=883185b2cb48a83c536e7f550913eba0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F19%2F20180119072554_fpope.jpg" />    
            </Swiper.SwiperItem>
          </Swiper>
        </View>
      </ScrollView>
    );
  }
}