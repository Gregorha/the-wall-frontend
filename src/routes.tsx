import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import Home from './pages/home';
import WallPage from './pages/wall';

interface PrivateRouteParams extends RouteProps {
  component: React.FC;
}

export interface UserLocalStorage {
  token?: string;
  id: number;
}

export const isAuthenticated = () => {
  const userStringified = localStorage.getItem('user');
  const user: UserLocalStorage = userStringified && JSON.parse(userStringified);
  return user?.token ? true : false;
};

const PrivateRoute = ({
  component: Component,
  ...rest
}: PrivateRouteParams) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/wall" component={WallPage} />
      <PrivateRoute path="/" component={() => <WallPage />} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
