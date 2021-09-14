import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Events } from '../pages/Events';
import { Home } from '../pages/Home';

export function Routes(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/bilhet/events" component={Events} />
    </Switch>
  );
}
