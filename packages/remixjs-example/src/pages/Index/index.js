import React, { Component } from 'react';
import { View } from 'remixjs/components';
import { ViewController } from 'remixjs/components';
import { transports } from 'remixjs/project';
import { API } from 'remixjs-message-protocol';

import './index.css';

export default class Index extends ViewController {
  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () {
    
  }

  render () {
    return (
      <View></View>
    );
  }
}