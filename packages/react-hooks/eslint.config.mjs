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
    // TypeScript handles type-checking for TS files; no-undef causes false positives for TS globals
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-undef': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs'],
    languageOptions: {
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
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // kept off: useClickOutside.js:28 has a for loop that @typescript-eslint/prefer-for-of flags
      '@typescript-eslint/prefer-for-of': 'off',
      'react/jsx-filename-extension': [
        1,
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
      'react/no-typos': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-bind': 2,
      'react/prop-types': 0,
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
  {
    // kept: useCopyToClipboard.test.js:52,74 use empty arrow functions, useId.test.js:7,19,30,31 use require()
    files: ['**/__tests__/**/*.js', '**/*.test.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
  {
    ignores: [
      '@types',
      'build',
      'dist',
      'node_modules',
    ],
  },
]);
