import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import hostReducers from './reducers';

const storeLogger = createLogger();

const createReducer = (remoteReducers) =>
  combineReducers({
    ...hostReducers,
    ...remoteReducers,
  });

/**
 * Cf. redux docs:
 * https://redux.js.org/recipes/code-splitting/#defining-an-injectreducer-function
 */
const configureStore = (middlewares) => {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(createReducer(), enhancer);

  store.remoteReducers = {};

  store.injectReducer = (key, remoteReducer) => {
    store.remoteReducers[key] = remoteReducer;
    store.replaceReducer(createReducer(store.remoteReducers));
  };

  return store;
};

const store = configureStore([thunkMiddleware, storeLogger]);

export default store;
