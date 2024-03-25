module.exports = {
  extends: 'trendmicro',
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  globals: {
    'globalThis': 'readonly',
  },
  plugins: [
    '@babel',
    'react-hooks',
  ],
  rules: {
    'camelcase': ['error', { 'allow': ['^DEPRECATED_'] }],
    'react/jsx-no-bind': 2,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
  },
};
