import { defineConfig } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig([
  js.configs.recommended,
  ...compat.extends('next/core-web-vitals'),
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
