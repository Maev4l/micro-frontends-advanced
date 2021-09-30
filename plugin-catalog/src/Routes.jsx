import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Catalog from './Catalog';
import Product from './Product';

const Routes = () => (
  <Switch>
    <Route exact path="/catalog">
      <Catalog />
    </Route>
    <Route exact path="/catalog/product/:productId">
      <Product />
    </Route>
  </Switch>
);

export default Routes;
