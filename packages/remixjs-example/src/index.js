

import React from 'react';

import { Application, TabBar } from 'remixjs/components';
import { Router, Route } from 'remixjs/router';
import { transports } from 'remixjs/project';


import User from './pages/User';
import Explore from './pages/Explore';
import SignIn from './pages/User/SignIn';


import './index.css';

const { TabBarItem } = TabBar;


export default () => {
  const onLaunch = () => {
    // transports.api.hideTabBar({
    //   animation: true
    // });
  }

  return <Application
    config={{
      navigationBarBackgroundColor: '#000000',
      backgroundColor: '#000000',
      navigationStyle: 'custom'
    }}

    onLaunch={onLaunch}
  >
    <Router>
      <Route path="pages/User/SignIn/index" component={SignIn} />
      <Route path="pages/Explore/index" component={Explore} />
      <Route path="pages/User/index" component={User} />
    </Router>

    <TabBar
      color="#5d4e36"
      selectedColor="#bb976c"
      backgroundColor="#000000"
      borderStyle="white"
    >
      <TabBarItem path="pages/User/SignIn/index">日程</TabBarItem>
      <TabBarItem path="pages/Explore/index">媒体发布</TabBarItem>
      <TabBarItem path="pages/Explore/index">媒体资料</TabBarItem>
      <TabBarItem path="pages/Explore/index">关于</TabBarItem>
    </TabBar>
  </Application>
}