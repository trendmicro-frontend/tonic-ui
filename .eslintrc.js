const path = require('path');

module.exports = {
  extends: 'trendmicro',
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: [
    '@babel',
    'react-hooks',
  ],
  rules: {
    'indent': ['error', 2],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-no-bind': ['warn', {
      'allowArrowFunctions': true
    }],
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'error',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
  },
};
