import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import { loadModule } from '../utils/module';
import { getContributions } from '../utils/contributions-manager';

import store from '../store';

const StoreExtensionPoint = ({ children }) => {
  useEffect(() => {
    const addSubStores = async (subStores) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const s of subStores) {
        const { scope, module, storeKey } = s;
        // eslint-disable-next-line no-await-in-loop
        const res = await loadModule(scope, module);
        res().then((data) => {
          const { default: reducers } = data;
          store.injectReducer(storeKey, reducers);
        });
      }
    };

    const stores = getContributions('store');

    addSubStores(stores);
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreExtensionPoint;
