import React, { Component } from 'react';
import { ScrollView, View, Image, Text, Button, Map, Picker, Swiper, Video } from 'remixjs/components';
import { ViewController } from 'remixjs/components';

import graphql from '../../common/graphql';

import './index.css';

const setUser = graphql(`
  mutation setUser($user: InputOfUser!) {
    setUser(user: $user) {
      nickname
      avatar
    }
  }
`);

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

  onGetUserInfo = (res) => {
    const { detail } = res;
    const { 
      encryptedData: encrypted,
      rawData: raw, 
      userInfo: userinfo, 
      signature, 
      errMsg,
      iv, 
    } = detail;

    if (errMsg === 'getUserInfo:ok') {
      setUser({
        user: {
          iv,
          raw,
          encrypted,
          signature
        }
      }).then(res => {

      }).catch(err => {

      })
    } else {

    }
  }



  contentRender () {
    const { current } = this.state;

    return (
      <View className="index__content">

      </View>
    );
  }

  render () {
    return (
      <View className="index">
        {this.contentRender()}
      </View>
    );
  }
}