import React from 'react';

import { Application } from 'remixjs/components';
import { Router, Route } from 'remixjs/router';

import Home from './pages/Home';


export default () => {
  return <Application 

  >
    <Router>
      <Route path="pages/Home/index" component={Home} />
    </Router>
  </Application>
}