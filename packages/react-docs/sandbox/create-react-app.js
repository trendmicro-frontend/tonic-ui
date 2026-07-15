export const getHtml = ({ language, title }) => `
<!DOCTYPE html>
<html lang="${language}">
  <head>
    <title>${title}</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`.trim();

export const getJSConfigJSON = () => `
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
`.trim();

export const getRootIndex = () => `
import { Global, css } from '@emotion/react';
import {
  Box,
  PortalManager,
  ToastManager,
  TonicProvider,
  createTheme,
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const customTheme = createTheme({
  components: {
    // Set default props for specific components
    //
    // Example:
    // \`\`\`
    // 'ToastCloseButton': {
    //   defaultProps: {
    //     'aria-label': 'Close toast',
    //   },
    // },
    // \`\`\`
  },
});

const Root = (props) => {
  const colorMode = 'dark';

  useEffect(() => {
    // Required for CSS theme variables with color mode support
    document.documentElement.setAttribute('data-color-scheme', colorMode);
  }, [colorMode]);

  return (
    <TonicProvider
      colorMode={{
        defaultValue: colorMode,
      }}
      theme={customTheme}
      useCSSBaseline
      useCSSVariables
    >
      <ToastManager
        // Ensure that \`ToastManager\` is positioned above \`PortalManager\` to allow toast notifications to be displayed within a portal.
        slotProps={{
          transition: {
            sx: {
              '[data-toast-placement^="top"] > &:first-of-type': {
                mt: '4x', // the space to the top edge of the screen
              },
              '[data-toast-placement^="bottom"] > &:last-of-type': {
                mb: '4x', // the space to the bottom edge of the screen
              },
              '[data-toast-placement$="left"] > &': {
                ml: '4x', // the space to the left edge of the screen
              },
              '[data-toast-placement$="right"] > &': {
                mr: '4x', // the space to the right edge of the screen
              },
            },
          },
        }}
      >
        <PortalManager>
          <GlobalStyles />
          <Box
            backgroundColor="background.low"
            color="text.primary"
            height="100vh"
            {...props}
          />
        </PortalManager>
      </ToastManager>
    </TonicProvider>
  );
};

const GlobalStyles = () => {
  const [colorMode] = useColorMode();

  // useTheme() automatically resolves color mode tokens (_dark/_light) based on the current color mode.
  const theme = useTheme();

  return (
    <Global
      styles={css\`
        :root, :host {
          color-scheme: \${colorMode};
        }
        :focus:not(:focus-visible) {
          outline: none;
        }
        body {
          font-size: \${theme.get('fontSizes.sm')};
          line-height: \${theme.get('lineHeights.sm')};
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background-color: \${theme.get('colors._component.scrollbar.track.enabled')};
        }
        ::-webkit-scrollbar-track:hover {
          background-color: \${theme.get('colors._component.scrollbar.track.hovered')};
        }
        ::-webkit-scrollbar-thumb {
          background-color: \${theme.get('colors._component.scrollbar.thumb.enabled')};
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: \${theme.get('colors._component.scrollbar.thumb.hovered')};
        }
      \`}
    />
  );
};

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <Root>
      <App />
    </Root>
  </React.StrictMode>
);
`.trim();

export const getDefaultComponent = () => `
import { Box } from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const App = forwardRef((props, ref) => {
  const styleProps = {
    // Define style props here
    //
    // Refer to Tonic UI documentation for available style props:
    // https://trendmicro-frontend.github.io/tonic-ui/react/latest/styled-system/style-props
  };

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    >
      Tonic UI is awesome
    </Box>
  );
});

App.displayName = 'App';

export default App;
`.trim();
