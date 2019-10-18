import React, { Component } from 'react';
import { View } from 'remixjs/components';
import { ViewController } from 'remixjs/components';

import './index.css';

export default class Index extends ViewController {
  config = {
    navigationBarTitleText: '我的'
  }

  render () {
    return (
      <View></View>
    );
  }
}