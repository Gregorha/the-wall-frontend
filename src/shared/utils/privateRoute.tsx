import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { UserLocalStorage } from '../../features/signIn/interface';

interface PrivateRouteParams extends RouteProps {
  component: React.FC;
}

export const isAuthenticated = () => {
  const userStringified = localStorage.getItem('user');
  const user: UserLocalStorage = userStringified && JSON.parse(userStringified);
  return user?.token ? true : false;
};

export const PrivateRoute = ({
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
