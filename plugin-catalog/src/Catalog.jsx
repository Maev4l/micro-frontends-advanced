/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { NavLink } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Product #1',
  },
  {
    id: 2,
    name: 'Product #2',
  },
  {
    id: 3,
    name: 'Product #3',
  },
];

const Catalog = () => (
  <div>
    <NavLink to="/">Back To Home</NavLink>
    <br />
    <h1>Catalog Module</h1>
    <ul>
      {products.map((p) => {
        const { id, name } = p;
        return (
          <li key={id}>
            <NavLink to={`/catalog/product/${id}`}>{name}</NavLink>
          </li>
        );
      })}
    </ul>
  </div>
);

export default Catalog;
