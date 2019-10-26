import React, { Component } from 'react';
import { View, Image, Text, Button, Map } from 'remixjs/components';
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
      <View className="test" onTouchStart={() => {}}>
        <Image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572124226102&di=883185b2cb48a83c536e7f550913eba0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F19%2F20180119072554_fpope.jpg" />
        <Map />
        <Button>T</Button>
      </View>
    );
  }
}