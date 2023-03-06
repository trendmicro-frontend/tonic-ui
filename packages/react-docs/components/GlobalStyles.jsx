import { Global, css } from '@emotion/react';
import {
  useColorMode,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import React from 'react';

const GlobalStyles = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const { colors, fontSizes, lineHeights } = useTheme();
  const backgroundColor = colorStyle.background.primary;
  const color = colorStyle.color.primary;
  const scrollbarThumbBackgroundColor = colorStyle.color.disabled;
  const scrollbarThumbHoverBackgroundColor = colorStyle.color.tertiary;
  const scrollbarThumbHoverBorderColor = colorStyle.color.secondary;
  const scrollbarTrackBackgroundColor = {
    light: 'gray:30',
    dark: 'gray:70',
  }[colorMode];

  return (
    <Global
      styles={css`
        :root {
          color-scheme: ${colorMode};
          scroll-behavior: smooth;
        }
        :focus:not(:focus-visible) {
          outline: none;
        }
        body {
          background-color: ${colors[backgroundColor]};
          color: ${colors[color]};
          font-size: ${fontSizes.sm};
          line-height: ${lineHeights.sm};
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background-color: ${colors[scrollbarTrackBackgroundColor]};
        }
        ::-webkit-scrollbar-thumb {
          background-color: ${colors[scrollbarThumbBackgroundColor]};
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: ${colors[scrollbarThumbHoverBackgroundColor]};
          border: 1px solid ${colors[scrollbarThumbHoverBorderColor]};
        }
      `}
    />
  );
};

export default GlobalStyles;
