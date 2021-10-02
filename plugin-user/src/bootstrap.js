/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { App } from './App';

render(
  <BrowserRouter>
    <Route exact path="/">
      <Redirect to="/user" />
    </Route>
    <App />
  </BrowserRouter>,
  document.getElementById('plugin-orders-root'),
);
