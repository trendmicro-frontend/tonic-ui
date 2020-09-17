import React from 'react';
import { useTheme } from '@trendmicro/react-styled-ui';
import { getColorPalette } from '@trendmicro/styled-ui-theme';
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
  const colorPalette = getColorPalette(mode);
  const indent = !!mode;
  let token = themes[theme] || colorPalette[theme];
  if (!token) {
    return 'Theme field not found';
  }
  if (theme === 'space' || theme === 'sizes') {
    token = Object.keys(token)
      .filter(key => !(key.toString().match(/\q|h/g))) // Filter strings matching 'g' or 'h' like '1q', '1h'
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
