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
    'camelcase': ['error', { 'allow': ['^DEPRECATED_'] }],
    'react/function-component-definition': 0,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
  },
};
