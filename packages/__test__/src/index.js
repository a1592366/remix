import React from 'react';

import { Application } from '@remix/core/components';
import { TabBar, Router } from '@remix/core/components';

import Remix from './pages/Remix';
import Playground from './pages/Playground';
import Docs from './pages/Docs';

import './index.css';

export default () => {
  return <Application
    config={{
      navigationStyle: 'custom'
    }}
  > 
    <Router>
      <Router.Route 
        path="pages/Remix/index" 
        component={Remix} 
        config={{

        }}
      />
      <Router.Route 
        path="pages/Playground/index" 
        component={Playground} 
      />
      <Router.Route 
        path="pages/Docs/index" 
        component={Docs} 
      />
    </Router>

    <TabBar
      borderStyle="white"
      color="#bfbfbf"
      selectedColor="#33aa9e"
    >
      <TabBar.TabBarItem 
        path="pages/Remix/index" 
        icon="./static/icons/remix.png" 
        selectedIcon="./static/icons/remix_selected.png"
      >
        Remix
      </TabBar.TabBarItem>
      <TabBar.TabBarItem 
        path="pages/Playground/index" 
        icon="./static/icons/playground.png"
        selectedIcon="./static/icons/playground_selected.png"
      >
        Playground
      </TabBar.TabBarItem>
      <TabBar.TabBarItem 
        path="pages/Docs/index" 
        icon="./static/icons/docs.png"
        selectedIcon="./static/icons/docs_selected.png"
      >
        Docs
      </TabBar.TabBarItem>
    </TabBar>
  </Application>
}