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
      // Documentation demos intentionally use placeholder links and alerts
      'jsx-a11y/anchor-is-valid': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'no-unused-vars': ['error', {
        // https://eslint.org/docs/latest/rules/no-unused-vars#args
        args: 'none', // do not check arguments
      }],
      'react/jsx-no-bind': 'off',
      'react/prop-types': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      '@stylistic/max-len': ['warn', {
        code: 200,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
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
