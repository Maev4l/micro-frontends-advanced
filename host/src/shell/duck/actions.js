import types from './types';

const { LOAD_PLUGINS } = types;

const load = (contributions) => ({
  type: LOAD_PLUGINS,
  contributions,
});

export default {
  load,
};
