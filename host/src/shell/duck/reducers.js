import types from './types';

const { LOAD_PLUGINS } = types;

const INITIAL_STATE = {
  contributions: [],
};

const main = (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
    case LOAD_PLUGINS: {
      const { contributions } = action;
      const { contributions: oldValues } = state;
      const newValues = [...oldValues, ...contributions];

      return { ...state, contributions: newValues };
    }
    default: {
      return { ...state };
    }
  }
};

export default main;
