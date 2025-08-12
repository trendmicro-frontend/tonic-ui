module.exports = {
  extends: [
    'trendmicro',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
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
    '@typescript-eslint',
  ],
  rules: {
    'no-return-await': 0,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true,
        'project': './tsconfig.json',
      }
    }
  },
  ignorePatterns: [
    'dist/**/*',
    'build/**/*',
    'coverage/**/*',
    'node_modules/**/*'
  ],
};
