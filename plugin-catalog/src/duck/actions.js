import types from './types';

const { ADD_TO_CART } = types;

const addToCart = (product) => ({
  type: ADD_TO_CART,
  product,
});

export default {
  addToCart,
};
