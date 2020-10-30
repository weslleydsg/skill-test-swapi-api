import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

import Home from '../pages/Home';

import Characters from '../pages/Characters';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/SignUp" component={SignUp} accessType="strictPublic" />
    <Route path="/SignIn" component={SignIn} accessType="strictPublic" />

    <Route path="/" exact component={Home} />

    <Route
      path="/characters"
      exact
      component={Characters}
      accessType="private"
    />
  </Switch>
);

export default Routes;
