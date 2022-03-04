import { Global, css } from '@emotion/react';
import {
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import React from 'react';

const GlobalStyles = () => {
  const [colorMode] = useColorMode();
  const theme = useTheme();
  const backgroundColor = {
    light: 'white',
    dark: 'gray:100',
  }[colorMode];
  const color = {
    light: 'black:primary',
    dark: 'white:primary',
  }[colorMode];

  return (
    <Global
      styles={css`
        :root {
          color-scheme: ${colorMode};
        }
        :focus:not(.focus-visible) {
          outline: none;
        }
        body {
          background-color: ${theme.colors[backgroundColor]};
          color: ${theme.colors[color]};
          font-size: ${theme.fontSizes.sm};
          line-height: ${theme.lineHeights.sm};
        }
      `}
    />
  );
};

export default GlobalStyles;
