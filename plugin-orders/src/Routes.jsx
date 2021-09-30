import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Orders from './Orders';

const Routes = () => (
  <Switch>
    <Route exact path="/orders">
      <Orders />
    </Route>
  </Switch>
);

export default Routes;
