import { defineConfig } from 'eslint/config';
import globals from 'globals';
import trendmicroConfig from 'eslint-config-trendmicro';

export default defineConfig([
  ...trendmicroConfig,
  {
    files: ['**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.es2025,
        ...globals.node,
      },
    },
  },
  {
    ignores: [
      'build',
      'coverage',
      'dist',
      'node_modules',
    ],
  },
]);
