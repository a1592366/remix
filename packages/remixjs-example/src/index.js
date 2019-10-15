

import React from 'react';

import { Application } from 'remixjs/components';
import { Router, Route } from 'remixjs/router';
import Index from './pages/Index';

export default () => {
  return <Application
    config={{
      
    }}
  >
    <Router>
      <Route path="pages/Index/index" component={Index} />
    </Router>
  </Application>
}