

import React from 'react';

import { Application } from 'remixjs/components';
import { Router, Route } from 'remixjs/router';
import { TabBar } from 'remixjs/components';

import Index from './pages/Index';

const { TabBarItem } = TabBar;

export default () => {

  return <Application
    config={{
      navigationBarBackgroundColor: '#000000'
    }}
  >
    <Router>
      <Route path="pages/Index/index" component={Index} />
    </Router>

    <TabBar>
      <TabBarItem path="pages/Index/index">
        我
      </TabBarItem>
      <TabBarItem path="pages/Index/index">
        我
      </TabBarItem>
    </TabBar>
  </Application>
}