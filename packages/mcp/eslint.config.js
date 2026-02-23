import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import babelPlugin from '@babel/eslint-plugin';
import trendmicroConfig from 'eslint-config-trendmicro';

export default defineConfig([
  ...trendmicroConfig,
  // @typescript-eslint v8+ has native flat config support
  ...tsPlugin.configs['recommended'],
  ...tsPlugin.configs['stylistic'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        globalThis: 'readonly',
      },
    },
    plugins: {
      '@babel': babelPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'no-return-await': 0,
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
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
  },
  {
    ignores: [
      'dist/**/*',
      'build/**/*',
      'coverage/**/*',
      'node_modules/**/*'
    ],
  },
]);
