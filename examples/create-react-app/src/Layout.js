import { Global, css } from '@emotion/react';
import React from 'react';
import {
  Box,
  useColorMode,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';

function Layout(props) {
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
    <>
      <Global
        styles={css`
          :root {
            color-scheme: ${colorMode};
          }
          :focus:not(:focus-visible) {
            outline: none;
          }
          body {
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
      <Box
        backgroundColor={backgroundColor}
        color={color}
        fontSize="sm"
        lineHeight="sm"
        height="100vh"
        {...props}
      />
    </>
  );
}

export default Layout;
