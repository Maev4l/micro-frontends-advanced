import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

import { loadModule } from '../utils/module';
import { getContributions } from '../utils/contributions-manager';
import Layout from '../app/Layout';

const RoutingExtensionPoint = () => {
  const nestedRoutes = getContributions('routing');

  return (
    <>
      {nestedRoutes.map((r) => {
        const { baseRoute, scope, module } = r;
        const Component = lazy(loadModule(scope, module));
        return (
          <Route key={baseRoute} path={baseRoute}>
            <Layout>
              <Suspense fallback="Loading...">
                <Component />
              </Suspense>
            </Layout>
          </Route>
        );
      })}
    </>
  );
};

export default RoutingExtensionPoint;
