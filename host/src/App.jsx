import React, { Suspense, useEffect, useState } from 'react';

import ExtensionPoint from './ExtensionPoint';

const App = () => {
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/plugins')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        const { plugins: modules } = data;
        setPlugins(modules);
      });
  }, []);

  const plugin = plugins[0];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div>Host</div>
        <ExtensionPoint {...plugin} />
      </div>
    </Suspense>
  );
};

export default App;
