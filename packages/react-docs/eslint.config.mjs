import { defineConfig } from 'eslint/config';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import nextPlugin from '@next/eslint-plugin-next';
import trendmicroConfig from 'eslint-config-trendmicro';

export default defineConfig([
  ...trendmicroConfig,
  nextPlugin.flatConfig.coreWebVitals,
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
      'react/prop-types': 0,
      'react/jsx-max-props-per-line': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'no-alert': 0,
      'no-unused-vars': ['error', {
        // https://eslint.org/docs/latest/rules/no-unused-vars#args
        args: 'none', // do not check arguments
      }],
    },
  },
  {
    ignores: [
      '.next',
      'build',
      'dist',
      'node_modules',
      'docs',
    ],
  },
]);
