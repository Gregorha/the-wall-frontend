import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './pages/home';
import WallPage from './pages/wall';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/wall" component={WallPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
