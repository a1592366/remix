

import React from 'react';

import { Application } from 'remixjs/components';
import { Router, Route } from 'remixjs/router';
import { TabBar } from 'remixjs/components';

import Index from './pages/Index';

import me from './static/images/me.png';

const { TabBarItem } = TabBar;

export default () => {

  return <Application
    config={{
      navigationBarBackgroundColor: '#000000',
      navigationStyle: 'custom'
    }}

    onLaunch={() => {}}
  >
    <Router>
      <Route path="pages/Index/index" component={Index} />
      <Route path="pages/Explore/index" component={Index} />
      <Route path="pages/Home/index" component={Index} />
    </Router>

    <TabBar>
      <TabBarItem 
        path="pages/Explore/index"
        icon={me}
      >
        发现
      </TabBarItem>
      <TabBarItem path="pages/Index/index">
        我
      </TabBarItem>
    </TabBar>
  </Application>
}