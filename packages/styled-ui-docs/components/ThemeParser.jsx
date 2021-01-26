import { useTheme, useColorMode, colorStyle } from '@trendmicro/react-styled-ui';
import _get from 'lodash/get';
import React from 'react';
import CodeBlock from './CodeBlock';
import jsonPrettify from './json-prettify';

const ThemeParser = ({ theme, mode, ...props }) => {
  const themes = useTheme();
  const indent = !!mode;
  const { colorMode } = useColorMode();
  const _mode = mode ?? colorMode;
  let token = _get(colorStyle[_mode], theme) || themes[theme];
  if (!token) {
    return 'Theme field not found';
  }
  if (theme === 'space' || theme === 'sizes') {
    token = Object.keys(token)
      .filter(key => !(key.toString().match(/[qh]$/))) // Filter strings matching 'q' or 'h' like '1q', '1h'
      .reduce((res, key) => {
        res[key] = token[key];
        return res;
      }, {});
  }
  const themeField = jsonPrettify(token, indent);
  return (
    <CodeBlock>
      {mode ? `export const ${mode} = {\n \ ${theme}:${themeField} \n}` : `export const ${theme} = ${themeField}`}
    </CodeBlock>
  );
};

export default ThemeParser;
