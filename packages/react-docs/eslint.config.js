import { defineConfig } from 'eslint/config';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import babelPlugin from '@babel/eslint-plugin';
import js from '@eslint/js';
import nextConfig from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  js.configs.recommended,
  nextConfig,  // eslint-config-next v16+ has native flat config support
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2015,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@babel': babelPlugin,
    },
    rules: {
      'react/prop-types': 0,
      'no-unused-vars': ['error', {
        // https://eslint.org/docs/latest/rules/no-unused-vars#args
        args: 'none', // do not check arguments
      }],
    },
  },
]);
