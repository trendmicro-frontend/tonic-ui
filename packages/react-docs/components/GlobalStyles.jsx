import { Global, css } from '@emotion/react';
import {
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import React from 'react';

const GlobalStyles = () => {
  const [colorMode] = useColorMode();
  const theme = useTheme();

  /**
   * Body
   */
  const backgroundColor = {
    light: 'white',
    dark: 'gray:100',
  }[colorMode];
  const color = {
    light: 'black:primary',
    dark: 'white:primary',
  }[colorMode];

  /**
   * Scrollbar
   */
  const scrollbarThumbBackgroundColor = {
    light: 'black:disabled',
    dark: 'white:disabled',
  }[colorMode];
  const scrollbarThumbHoverBackgroundColor = {
    light: 'black:tertiary',
    dark: 'white:tertiary',
  }[colorMode];
  const scrollbarThumbHoverBorderColor = {
    light: 'black:secondary',
    dark: 'white:secondary',
  }[colorMode];
  const scrollbarTrackBackgroundColor = {
    light: 'gray:30',
    dark: 'gray:70',
  }[colorMode];

  return (
    <Global
      styles={css`
        :root {
          color-scheme: ${colorMode};
        }
        :focus:not(:focus-visible) {
          outline: none;
        }
        body {
          background-color: ${theme.colors[backgroundColor]};
          color: ${theme.colors[color]};
          font-size: ${theme.fontSizes.sm};
          line-height: ${theme.lineHeights.sm};
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background-color: ${theme.colors[scrollbarTrackBackgroundColor]};
        }
        ::-webkit-scrollbar-thumb {
          background-color: ${theme.colors[scrollbarThumbBackgroundColor]};
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: ${theme.colors[scrollbarThumbHoverBackgroundColor]};
          border: 1px solid ${theme.colors[scrollbarThumbHoverBorderColor]};
        }
      `}
    />
  );
};

export default GlobalStyles;
