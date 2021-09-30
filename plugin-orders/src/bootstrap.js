/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Routes from './Orders';

render(
  <BrowserRouter>
    <Route exact path="/">
      <Redirect to="/orders" />
    </Route>
    <Routes />
  </BrowserRouter>,
  document.getElementById('plugin-orders-root'),
);
