import { Global, css } from '@emotion/react';
import {
  useColorMode,
  useTheme,
} from '@tonic-ui/react';

function GlobalStyles() {
  const [colorMode] = useColorMode();
  const theme = useTheme();

  const scrollbarTrackColor = colorMode === 'dark'
    ? theme.get('colors.gray:70')
    : theme.get('colors.gray:30');
  const scrollbarThumbColor = colorMode === 'dark'
    ? theme.get('colors.white:disabled')
    : theme.get('colors.black:disabled');
  const scrollbarThumbHoverColor = colorMode === 'dark'
    ? theme.get('colors.white:tertiary')
    : theme.get('colors.black:tertiary');

  return (
    <Global
      styles={css`
        :root, :host {
          color-scheme: ${colorMode};
        }
        #root {
          height: 100%;
        }
        :focus:not(:focus-visible) {
          outline: none;
        }
        body {
          font-size: ${theme.get('fontSizes.sm')};
          line-height: ${theme.get('lineHeights.sm')};
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background-color: ${scrollbarTrackColor};
        }
        ::-webkit-scrollbar-track:hover {
          background-color: ${scrollbarTrackColor};
        }
        ::-webkit-scrollbar-thumb {
          background-color: ${scrollbarThumbColor};
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: ${scrollbarThumbHoverColor};
        }
      `}
    />
  );
}

export default GlobalStyles;
