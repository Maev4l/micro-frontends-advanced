import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

import { loadModule } from '../utils/module';

const ExtensionPoint = ({ id }) => {
  const contribution = useSelector((store) => {
    const {
      main: { contributions },
    } = store;

    return contributions.find((c) => {
      const { contributionId } = c;
      return contributionId === id;
    });
  });

  if (!contribution) {
    return null;
  }

  const { scope, module } = contribution;

  const Component = lazy(loadModule(scope, module));

  return (
    <Suspense fallback="Loading">
      <Component />
    </Suspense>
  );
};

export default ExtensionPoint;
