import { multilineSxArray } from './rules/multiline-sx-array.mjs';
import { noFlatStyleProps } from './rules/no-flat-style-props.mjs';
import { noInlineStyle } from './rules/no-inline-style.mjs';
import { noRawHtmlElements } from './rules/no-raw-html-elements.mjs';
import { noResponsiveStyleArrays } from './rules/no-responsive-style-arrays.mjs';
import { noSpreadComposeSx } from './rules/no-spread-compose-sx.mjs';

const runtimeRules = {
  '@tonic-ui/no-responsive-style-arrays': 'error',
  '@tonic-ui/no-spread-compose-sx': 'error',
};

const plugin = {
  meta: {
    name: '@tonic-ui/eslint-plugin',
  },
  rules: {
    'multiline-sx-array': multilineSxArray,
    'no-flat-style-props': noFlatStyleProps,
    'no-inline-style': noInlineStyle,
    'no-raw-html-elements': noRawHtmlElements,
    'no-responsive-style-arrays': noResponsiveStyleArrays,
    'no-spread-compose-sx': noSpreadComposeSx,
  },
};

plugin.configs = {
  'runtime-safety': {
    name: '@tonic-ui/runtime-safety',
    plugins: { '@tonic-ui': plugin },
    rules: runtimeRules,
  },
  recommended: {
    name: '@tonic-ui/recommended',
    plugins: {
      '@tonic-ui': plugin,
    },
    rules: {
      '@tonic-ui/no-flat-style-props': 'error',
      ...runtimeRules,
    },
  },
  'inline-style': {
    name: '@tonic-ui/inline-style',
    plugins: { '@tonic-ui': plugin },
    rules: { '@tonic-ui/no-inline-style': 'error' },
  },
  'raw-html': {
    name: '@tonic-ui/raw-html',
    plugins: { '@tonic-ui': plugin },
    rules: { '@tonic-ui/no-raw-html-elements': 'error' },
  },
  'sx-formatting': {
    name: '@tonic-ui/sx-formatting',
    plugins: { '@tonic-ui': plugin },
    rules: { '@tonic-ui/multiline-sx-array': 'warn' },
  },
};

export default plugin;
