import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Catalog from './Catalog';

const Routes = () => (
  <Switch>
    <Route exact path="/catalog">
      <Catalog />
    </Route>
  </Switch>
);

export default Routes;
