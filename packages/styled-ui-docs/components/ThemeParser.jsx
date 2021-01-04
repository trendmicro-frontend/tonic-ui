import { useTheme } from '@trendmicro/react-styled-ui';
import React from 'react';
import CodeBlock from './CodeBlock';
import getColorPalette from './color-palette';
import jsonPrettify from './json-prettify';

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
