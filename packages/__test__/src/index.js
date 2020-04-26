import React from 'react';

import { Application } from '@remix/core/components';
import { TabBar, Router } from '@remix/core/components';

import Index from './pages/Index';
import User from './pages/User';

export default () => {
  return <Application>
    <Router>
      <Router.Route path="pages/Index/index" component={Index} />
      <Router.Route path="pages/User/index" component={User} />
    </Router>

    <TabBar>
      <TabBar.TabBarItem path="pages/Index/index" icon="">
        首页
      </TabBar.TabBarItem>
      <TabBar.TabBarItem path="pages/User/index" icon="">
        我的
      </TabBar.TabBarItem>
    </TabBar>
  </Application>
}