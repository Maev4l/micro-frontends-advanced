import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from '../home/Home';
import { loadModule } from '../utils/module';
import { addContributions } from '../utils/contributions-manager';
import RoutingExtensionPoint from '../extensions/RoutingExtensionPoint';
import StoreExtensionPoint from '../extensions/StoreExtensionPoint';

const addScripTag = (url) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = url;
    script.addEventListener('load', () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      resolve();
    });
    script.addEventListener('error', () => {
      console.error(`Dynamic Script Error: ${url}`);
      reject();
    });
    document.head.appendChild(script);
  });

const App = () => {
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    const loadPlugins = async () => {
      fetch('http://localhost:3000/api/plugins')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          setState({ ...state, status: 'error' });
          throw response;
        })
        .then((data) => {
          const { plugins } = data;
          return plugins;
        })
        .then(async (plugins) => {
          const proms = plugins.map((p) => {
            const { url } = p;
            return addScripTag(url);
          });
          await Promise.all(proms);
          return plugins;
        })
        .then(async (plugins) => {
          // eslint-disable-next-line no-restricted-syntax
          for (const p of plugins) {
            const { scope, module } = p;
            // eslint-disable-next-line no-await-in-loop
            const res = await loadModule(scope, module);
            res().then((data) => {
              const { default: d } = data;
              addContributions(d.map((contribution) => ({ ...contribution, scope })));
              setState({
                ...state,
                status: 'success',
              });
            });
          }
        });
    };

    loadPlugins();
  }, []);

  const { status } = state;
  if (status === 'loading') {
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div>
        <h1>Failed to load plugins.</h1>
      </div>
    );
  }

  return (
    <StoreExtensionPoint>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Layout>
              <Home />
            </Layout>
          </Route>
          <RoutingExtensionPoint />
        </Switch>
      </BrowserRouter>
    </StoreExtensionPoint>
  );
};

export default App;
