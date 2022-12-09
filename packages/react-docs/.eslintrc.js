module.exports = {
  extends: [
    'eslint:recommended',
    'next',
  ],
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es6: true, // enables ES6 globals
    node: true,
    jest: true,
  },
  plugins: [
    '@babel',
  ],
  rules: {
    'react/prop-types': 0,
  },
};
