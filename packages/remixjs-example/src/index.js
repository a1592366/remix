

import React from 'react';

import { Application } from 'remixjs/components';
import { Router, Route } from 'remixjs/router';
import { TabBar } from 'remixjs/components';

import User from './pages/User';
import Explore from './pages/Explore';

import me from './static/images/me.png';
import meSelected from './static/images/me_selected.png';
import explore from './static/images/explore.png';
import exploreSelected from './static/images/explore_selected.png';

import './index.css';

const { TabBarItem } = TabBar;

export default () => {

  return <Application
    config={{
      navigationBarBackgroundColor: '#000000',
      navigationStyle: 'custom'
    }}

    onLaunch={(options) => {
    }}
  >
    <Router>
      <Route path="pages/Explore/index" component={Explore} />
      <Route path="pages/User/index" component={User} />
    </Router>

    <TabBar
      selectedColor={'#333333'}
    >
      <TabBarItem 
        path="pages/Explore/index"
        icon={me}
        selectedIcon={meSelected}
      >
        发现
      </TabBarItem>
      <TabBarItem 
        path="pages/User/index"
        icon={explore}
        selectedIcon={exploreSelected}
      >
        我
      </TabBarItem>
    </TabBar>
  </Application>
}