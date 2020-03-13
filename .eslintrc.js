const path = require('path');

module.exports = {
  extends: 'trendmicro',
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: [
    'react-hooks',
  ],
  rules: {
    'indent': ['error', 2],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
  },
};
