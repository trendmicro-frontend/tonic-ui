import React from 'react';
import { useTheme } from '@trendmicro/react-styled-ui';
import CodeBlock from './CodeBlock';

const ThemeParser = ({ theme, ...props }) => {
  const themes = useTheme();

  if (!themes[theme]) {
    return 'Theme field not found';
  }

  const themeField = JSON.stringify(themes[theme], null, 2)
    .replace(/\"/g, '\'')
    .replace(/\'(\d+|[a-z]+)\':/g, '$1:');

  return (
    <CodeBlock>
      {`export const ${theme} = ${themeField}`}
    </CodeBlock>
  );
};

export default ThemeParser;
