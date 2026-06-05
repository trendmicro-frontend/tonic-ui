import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import trendmicroConfig from 'eslint-config-trendmicro';

export default defineConfig([
  tsPlugin.configs['flat/recommended'], // TypeScript-specific error rules
  tsPlugin.configs['flat/stylistic'], // TypeScript style rules
  ...trendmicroConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs'],
    languageOptions: {
      // @typescript-eslint/parser handles TypeScript syntax (types, decorators,
      // generics) and also works for plain JS files in a TS project.
      parser: tsParser,
      sourceType: 'module',
      globals: {
        ...globals.es2025,
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
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
          'alwaysTryTypes': true, // resolve @types/* packages
          'project': './tsconfig.json',
        }
      }
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
