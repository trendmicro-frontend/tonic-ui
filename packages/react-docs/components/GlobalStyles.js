import { Global, css } from '@emotion/react';
import {
  useColorMode,
  useTheme,
} from '@tonic-ui/react';

const GlobalStyles = () => {
  const [colorMode] = useColorMode();

  const theme = useTheme();

  return (
    <Global
      styles={css`
        :root, :host {
          color-scheme: ${colorMode};
          scroll-behavior: smooth; // Enable smooth scrolling for the TOC links
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
          background-color: ${theme.get('colors._component.scrollbar.track.enabled')};
        }
        ::-webkit-scrollbar-track:hover {
          background-color: ${theme.get('colors._component.scrollbar.track.hovered')};
        }
        ::-webkit-scrollbar-thumb {
          background-color: ${theme.get('colors._component.scrollbar.thumb.enabled')};
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: ${theme.get('colors._component.scrollbar.thumb.hovered')};
        }
      `}
    />
  );
};

export default GlobalStyles;
