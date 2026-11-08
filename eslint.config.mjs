import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es2025,
        ...globals.node,
      },
    },
  },
  {
    ignores: [
      '**/.e2e',
      '**/build',
      '**/coverage',
      '**/dist',
      '**/node_modules',
      '**/output',
      '**/public',
    ],
  },
]);
