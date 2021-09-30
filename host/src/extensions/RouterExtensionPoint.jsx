import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import { loadModule } from '../utils/module';
import Layout from '../shell/Layout';

const RouterExtensionPoint = () => {
  const subRouters = useSelector((store) => {
    const {
      main: { contributions },
    } = store;

    const routes = [];
    contributions.forEach((c) => {
      const { contributionId } = c;
      if (contributionId === 'routing') {
        const { module, scope, route } = c;
        routes.push({ module, scope, route });
      }
    });
    return routes;
  });

  return (
    <>
      {subRouters.map((s) => {
        const { route, scope, module } = s;
        const Component = lazy(loadModule(scope, module));
        return (
          <Route key={route} path={route}>
            <Layout>
              <Suspense fallback="Loading">
                <Component />
              </Suspense>
            </Layout>
          </Route>
        );
      })}
    </>
  );
};

export default RouterExtensionPoint;
