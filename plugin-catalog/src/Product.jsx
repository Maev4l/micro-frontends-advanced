import React from 'react';
import { useParams, NavLink } from 'react-router-dom';

const Product = () => {
  const { productId } = useParams();
  return (
    <div>
      <NavLink to="/catalog">Back</NavLink>
      <br />
      <h2>Product #{productId}</h2>
    </div>
  );
};

export default Product;
