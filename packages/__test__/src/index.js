import React from 'react';

import { Application, TabBar } from '@remix/core/components';
import { Router, Route } from '@remix/core/router';

import Index from './pages/Index';

export default () => {
  return <Application 
  >
    <Router>
      <Route path="pages/Index/index" component={Index} />
      <Route path="pages/Explore/index" component={Index} />
      <Route path="pages/Home/index" component={Index} />
    </Router>

    <TabBar>
      <TabBar.TabBarItem icon="" path="pages/Index/index" component={Index}>
        测试
      </TabBar.TabBarItem>
      <TabBar.TabBarItem icon="" path="pages/Index/index" component={Index}>
        测试
      </TabBar.TabBarItem>
    </TabBar>
  </Application>
}