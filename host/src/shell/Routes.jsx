import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from '../home/Home';

import RouterExtensionPoint from '../extensions/RouterExtensionPoint';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Layout>
          <Home />
        </Layout>
      </Route>
      <RouterExtensionPoint />
    </Switch>
  </BrowserRouter>
);

export default Routes;
