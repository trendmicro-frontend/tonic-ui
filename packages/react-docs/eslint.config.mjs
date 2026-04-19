import { defineConfig } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import trendmicroConfig from 'eslint-config-trendmicro';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

// `eslint-config-trendmicro` already registers the `import` plugin, so strip it
// from the compat output to avoid "Cannot redefine plugin" errors.
const nextConfigs = compat.extends('next/core-web-vitals').map((config) => {
  if (config.plugins?.import) {
    const { import: _ignored, ...plugins } = config.plugins; // eslint-disable-line no-unused-vars
    return { ...config, plugins };
  }
  return config;
});

export default defineConfig([
  ...trendmicroConfig,
  ...nextConfigs,
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
      'react/jsx-max-props-per-line': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'no-alert': 0,
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
