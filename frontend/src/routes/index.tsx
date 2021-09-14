import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Cart } from '../pages/Cart';
import { Events } from '../pages/Events';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';

export function Routes(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/bilhet/events" component={Events} />
      <Route exact path="/bilhet/cart" component={Cart} />
      <Route exact path="/bilhet/login" component={Login} />
    </Switch>
  );
}
