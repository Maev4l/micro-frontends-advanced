/* eslint-disable dot-notation */
import React from 'react';

import { useSelector } from 'react-redux';

const Home = () => {
  // Ugly and hardcoded code to check the redux store is really shared
  const data = useSelector((store) => {
    const x = store['catalog'];
    if (x) {
      const y = x['cart'];
      return y;
    }
    return null;
  });

  return (
    <div>
      <h1>Home Page</h1>
      {data && data.length > 0 && (
        <div>
          <br />
          <p>{data.length} product(s) in cart.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
