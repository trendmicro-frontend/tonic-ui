import { defineConfig } from 'eslint/config';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import trendmicroConfig from 'eslint-config-trendmicro';

export default defineConfig([
  ...trendmicroConfig,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    languageOptions: {
      parser: babelParser,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        globalThis: 'readonly',
      },
    },
    rules: {
      'camelcase': ['error', { 'allow': ['^DEPRECATED_'] }],
      'react/jsx-no-bind': 2,
      'react/prop-types': 0,
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    },
  },
  {
    ignores: [
      'build',
      'dist',
      'node_modules',
    ],
  },
]);
