import types from './types';

const { ADD_TO_CART } = types;

const INITIAL_STATE = {
  cart: [],
};

const main = (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
    case ADD_TO_CART: {
      const { product } = action;
      const { cart: oldValues } = state;
      const newValues = [...oldValues, product];

      return { ...state, cart: newValues };
    }
    default: {
      return { ...state };
    }
  }
};

export default main;
