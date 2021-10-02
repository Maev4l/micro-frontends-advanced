import React, { lazy, Suspense } from 'react';
import { getContributions } from '../utils/contributions-manager';

import { loadModule } from '../utils/module';
import Loading from '../utils/Loading';

const ExtensionPoint = ({ id }) => {
  const [contribution] = getContributions(id);

  if (!contribution) {
    return null;
  }

  const { scope, module } = contribution;

  const Component = lazy(loadModule(scope, module));

  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

export default ExtensionPoint;
