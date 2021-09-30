/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';
import App from './shell/App';

const storeLogger = createLogger();

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, storeLogger));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
