module.exports = {
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
  },
  rules: {
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'react/prop-types': 'off',
  },
};
