import React, { lazy, Suspense, useState, useEffect } from 'react';

const loadComponent = (scope, module) => async () => {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  // eslint-disable-next-line no-undef
  await __webpack_init_sharing__('default');
  const container = window[scope]; // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  // eslint-disable-next-line no-undef
  await container.init(__webpack_share_scopes__.default);
  const factory = await window[scope].get(module);
  const Module = factory();
  return Module;
};

const useDynamicScript = (args) => {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const { url } = args;
  useEffect(() => {
    if (!url) {
      return;
    }

    const element = document.createElement('script');

    element.src = args.url;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    // eslint-disable-next-line consistent-return
    return () => {
      // Cleanup function (see: https://designcode.io/react-hooks-handbook-useeffect-hook)
      console.log(`Dynamic Script Removed: ${url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

const ExtensionPoint = ({ url, scope, module }) => {
  const { ready, failed } = useDynamicScript({
    url,
  });

  if (!ready) {
    return <h2>Loading dynamic script: {url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {url}</h2>;
  }

  const Component = lazy(loadComponent(scope, module));

  return (
    <Suspense fallback="Loading Plugin">
      <Component />
    </Suspense>
  );
};

export default ExtensionPoint;
