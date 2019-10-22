

import React from 'react';

import { Application } from 'remixjs/components';
import { Router, Route } from 'remixjs/router';
import { TabBar } from 'remixjs/components';

import Index from './pages/Index';

import me from './static/images/me.png';
import meSelected from './static/images/me_selected.png';
import explore from './static/images/explore.png';
import exploreSelected from './static/images/explore_selected.png';


const { TabBarItem } = TabBar;

export default () => {

  return <Application
    config={{
      navigationBarBackgroundColor: '#000000',
      navigationStyle: 'custom'
    }}

    onLaunch={(options) => {
      debugger;
    }}
  >
    <Router>
      <Route path="pages/Index/index" component={Index} />
      <Route path="pages/Explore/index" component={Index} />
      <Route path="pages/Home/index" component={Index} />
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
        path="pages/Index/index"
        icon={explore}
        selectedIcon={exploreSelected}
      >
        我
      </TabBarItem>
    </TabBar>
  </Application>
}