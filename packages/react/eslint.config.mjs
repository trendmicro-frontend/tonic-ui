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
      '@typescript-eslint/no-empty-function': ['error', {
        allow: ['arrowFunctions'],
      }],
      '@typescript-eslint/no-unused-expressions': ['error', {
        allowShortCircuit: true,
        allowTernary: true,
      }],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-unused-vars': 'off',
      'camelcase': ['error', { 'allow': ['^DEPRECATED_'] }],
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/jsx-no-bind': 'warn',
      'react/no-typos': 'warn',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        pragma: 'React',
        version: 'detect',
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
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
    files: ['**/*.d.ts'],
    rules: {
      'no-undef': 'off',
    },
  },
  {
    files: ['**/*.test-d.tsx'],
    rules: {
      'indent': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'react/jsx-indent': 'off',
      'react/jsx-no-bind': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'off',
    },
  },
  {
    ignores: [
      '@types',
      'build',
      'dist',
      'global.d.ts',
      'node_modules',
    ],
  },
]);
