import React from 'react';
import _get from 'lodash.get';
import { useTheme, useColorMode, colorPalettes } from '@trendmicro/react-styled-ui';
import CodeBlock from './CodeBlock';

const jsonStringify = (obj, indent) => {
  if (indent) {
    return JSON.stringify(obj, null, 2)
      .replace(/\"/g, '\'')
      .replace(/\'(\d+|[a-z]+)\':/g, '\ \ $1:')
      .replace(/{/g, '\ {')
      .replace(/}/g, '\ \ }');
  }
  return JSON.stringify(obj, null, 2)
    .replace(/\"/g, '\'')
    .replace(/\'(\d+|[a-z]+)\':/g, '$1:');
};

const ThemeParser = ({ theme, mode, ...props }) => {
  const themes = useTheme();
  const indent = !!mode;
  const { colorMode } = useColorMode();
  const _mode = mode ?? colorMode;
  let token = _get(colorPalettes[_mode], theme) || themes[theme];
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
  const themeField = jsonStringify(token, indent);
  return (
    <CodeBlock>
      {mode ? `export const ${mode} = {\n \ ${theme}:${themeField} \n}` : `export const ${theme} = ${themeField}`}
    </CodeBlock>
  );
};

export default ThemeParser;
