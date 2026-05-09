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
      sourceType: 'module',
      globals: {
        ...globals.es2025,
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'camelcase': ['error', { 'allow': ['^DEPRECATED_'] }],
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
      'no-shadow': 0,
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
