/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';

import Catalog from './Catalog';
/*
const mount = (el) => {
  render(<div>Catalog Module</div>, el);
};
*/
/*
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('plugin-1-root');
  if (devRoot) {
    mount(devRoot);
  }
}
*/

/*
export { mount };
*/

render(<Catalog />, document.getElementById('plugin-catalog-root'));
