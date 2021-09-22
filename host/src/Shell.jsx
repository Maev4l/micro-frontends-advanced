import React, { lazy, Suspense } from 'react';

const ExtensionOneLay = lazy(() => import('./ExtensionOne'));

const Shell = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div>Host</div>
        <ExtensionOneLay />
      </div>
    </Suspense>
  );
};

export default Shell;
