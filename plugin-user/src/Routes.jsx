import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserProfile from './UserProfile';

const Routes = () => (
  <Switch>
    <Route exact path="/user/settings">
      <UserProfile />
    </Route>
  </Switch>
);

export default Routes;
