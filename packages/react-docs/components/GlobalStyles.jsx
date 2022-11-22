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
          position: relative;
          width: 8px;
          height: 100%;
          margin: 0 auto;
          border-radius: 0;
          text-align: center;
          cursor: pointer;
          border: 1px solid rgba(0, 0, 0, .1);
          -webkit-transition: all .5s ease-in-out;
          transition: all .5s ease-in-out;
          background-color: rgba(0, 0, 0, .2);
        }

        ::-webkit-scrollbar:hover {
          background-color: rgba(0, 0, 0, .45);
          border: 1px solid rgba(0, 0, 0, .3);
        }

        ::-webkit-scrollbar-thumb {
          background-color: hsla(0, 0%, 100%, .35);
          border: 1px solid hsla(0, 0%, 100%, .2);
        }

        ::-webkit-scrollbar-track {
          width: 4px;
          height: 100%;
          margin: 0 auto;
          border-radius: 0;
          -webkit-transition: all .5s ease-in-out;
          transition: all .5s ease-in-out;
          background-color: #303030;
        }

        ::-webkit-scrollbar-track:hover {
          background-color: hsla(0, 0%, 100%, .15);
        }
      `}
    />
  );
};

export default GlobalStyles;
