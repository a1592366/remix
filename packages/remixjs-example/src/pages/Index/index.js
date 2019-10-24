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
    transports.api.request({
      url: 'http://127.0.0.1:10002/api/inspect'
    }).then(res => {
      transports.api.navigateTo({
        url: '/pages/User/Index'
      }).then(res => {
        debubger;
      })
    });

    // const socket = transports.api.connectSocket({
    //   url: 'ws://127.0.0.1:10002',
    //   protocols: ['test']
    // });

    // socket.onOpen(function () {
    //   debugger;
    //   socket.send({
    //     data: 'hello world'
    //   })
    // });

  }

  render () {
    return (
      <View></View>
    );
  }
}