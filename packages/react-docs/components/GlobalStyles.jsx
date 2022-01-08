import { Global, css } from '@emotion/react';
import {
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import React from 'react';

const GlobalStyles = () => {
  const [colorMode] = useColorMode();
  const { fontSizes, lineHeights } = useTheme();

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
          font-size: ${fontSizes.sm};
          line-height: ${lineHeights.sm};
        }
      `}
    />
  );
};

export default GlobalStyles;
