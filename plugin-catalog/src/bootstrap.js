/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import cartReducer from './duck/reducers';

import App from './App';

const storeLogger = createLogger();

const reducers = {
  cart: cartReducer,
};

const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware, storeLogger));

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path="/">
        <Redirect to="/catalog" />
      </Route>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('plugin-catalog-root'),
);
