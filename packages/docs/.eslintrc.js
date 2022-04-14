module.exports = {
  extends: [
    'eslint:recommended',
    'next',
  ],
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
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
