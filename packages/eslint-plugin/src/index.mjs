import { noFlatStyleProps } from './rules/no-flat-style-props.mjs';
import { noInlineStyle } from './rules/no-inline-style.mjs';
import { noRawHtmlElements } from './rules/no-raw-html-elements.mjs';

const plugin = {
  meta: {
    name: '@tonic-ui/eslint-plugin',
  },
  rules: {
    'no-flat-style-props': noFlatStyleProps,
    'no-inline-style': noInlineStyle,
    'no-raw-html-elements': noRawHtmlElements,
  },
};

plugin.configs = {
  recommended: {
    name: '@tonic-ui/recommended',
    plugins: {
      '@tonic-ui': plugin,
    },
    rules: {
      '@tonic-ui/no-flat-style-props': 'error',
      '@tonic-ui/no-inline-style': 'error',
      '@tonic-ui/no-raw-html-elements': 'error',
    },
  },
};

export default plugin;
