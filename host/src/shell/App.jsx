import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { operations } from './duck';
import Routes from './Routes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { loadPlugins } = operations;
    dispatch(loadPlugins());
  });

  return <Routes />;
};

export default App;
