import actions from './actions';
import { loadModule } from '../../utils/module';

const { load } = actions;

const addScripTag = (url) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = url;
    script.addEventListener('load', () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      resolve();
    });
    script.addEventListener('error', () => {
      console.error(`Dynamic Script Error: ${url}`);
      reject();
    });
    document.head.appendChild(script);
  });

const loadPlugins = () => async (dispatch) => {
  fetch('http://localhost:3000/api/plugins')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then((data) => {
      const { plugins } = data;
      return plugins;
    })
    .then(async (plugins) => {
      const proms = plugins.map((p) => {
        const { url } = p;
        return addScripTag(url);
      });
      await Promise.all(proms);
      return plugins;
    })
    .then(async (plugins) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const p of plugins) {
        const { scope, module } = p;
        // eslint-disable-next-line no-await-in-loop
        const res = await loadModule(scope, module);
        res().then((data) => {
          const { default: contributions } = data;
          dispatch(load(contributions.map((c) => ({ ...c, scope }))));
        });
      }
    });
};

export default {
  loadPlugins,
};
