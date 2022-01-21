import { Global, css } from '@emotion/react';
import {
  useTheme,
} from '@tonic-ui/react';
import React from 'react';

const GlobalStyles = () => {
  const theme = useTheme();

  /**
   * The following custom properties are defined in "pages/_document.js"
   * --root-background-color
   * --root-color
   * --root-color-scheme
   */

  return (
    <Global
      styles={css`
        :root {
          color-scheme: var(--root-color-scheme);
        }
        :focus:not(.focus-visible) {
          outline: none;
        }
        body {
          background-color: var(--root-background-color);
          color: var(--root-color);
          font-size: ${theme.fontSizes.sm};
          line-height: ${theme.lineHeights.sm};
        }
      `}
    />
  );
};

export default GlobalStyles;
