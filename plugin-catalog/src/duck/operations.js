import actions from './actions';

const { addToCart } = actions;

const add = (product) => async (dispatch) => {
  dispatch(addToCart(product));
};

export default {
  add,
};
