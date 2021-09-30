import { combineReducers } from 'redux';

import mainReducers from './shell/duck';

const rootReducer = combineReducers({
  main: mainReducers,
});

export default rootReducer;
