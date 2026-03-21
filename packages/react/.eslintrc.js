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
    'max-lines-per-function': ['warn', { 'max': 500, 'skipComments': true }],
    'react/jsx-no-bind': 2,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
  },
  'overrides': [
    {
      'files': ['**/__tests__/**/*.{js,ts,jsx,tsx}', '**/*.test.{js,ts,jsx,tsx}'],
      'rules': {
        'max-lines-per-function': 'off',
      }
    }
  ]
};
