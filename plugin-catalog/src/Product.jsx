import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';

import { operations } from './duck';

const Product = () => {
  const { productId } = useParams();
  const [open, toggle] = useState(false);

  const { add } = operations;
  const dispatch = useDispatch();

  return (
    <div>
      <NavLink to="/catalog">Back</NavLink>
      <br />
      <h2>Product #{productId}</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(add({ id: productId, name: `Product #${productId}` }));
          toggle(true);
        }}
      >
        Add to cart
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => toggle(false)}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
      >
        <Alert>{`Product #${productId} added to cart.`}</Alert>
      </Snackbar>
    </div>
  );
};

export default Product;
