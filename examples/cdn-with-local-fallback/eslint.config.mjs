import { defineConfig } from 'eslint/config';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import rootConfig from '../../eslint.config.mjs';

export default defineConfig([
  ...rootConfig,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.es2025,
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // JSX usage must count as a variable read, otherwise `no-unused-vars`
      // reports every imported component.
      'react/jsx-uses-vars': 'error',
    },
  },
]);
