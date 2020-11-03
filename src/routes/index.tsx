import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

import Home from '../pages/Home';

import Character from '../pages/Character';
import Starship from '../pages/Starship';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />

    <Route path="/SignUp" component={SignUp} accessType="strictPublic" />
    <Route path="/SignIn" component={SignIn} accessType="strictPublic" />

    <Route path="/character/:id" component={Character} accessType="private" />

    <Route path="/starship/:id" component={Starship} accessType="private" />
  </Switch>
);

export default Routes;
