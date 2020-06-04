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

const ThemeParser = ({ theme, colorMode, ...props }) => {
  const themes = useTheme();
  const colorPalette = getColorPalette(colorMode);
  const token = themes[theme] || colorPalette[theme];
  const indent = !!colorMode;
  if (!token) {
    return 'Theme field not found';
  }
  const themeField = jsonStringify(token, indent);
  return (
    <CodeBlock>
      {colorMode ? `export const ${colorMode} = {\n \ ${theme}:${themeField} \n}` : `export const ${theme} = ${themeField}`}
    </CodeBlock>
  );
};

export default ThemeParser;
