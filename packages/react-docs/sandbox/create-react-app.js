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
  colorStyle,
  theme,
  useColorMode,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const customColorStyle = {
  ...colorStyle,
  dark: {
    ...colorStyle.dark,

    // Add custom colors here
    risk: {
      high: 'red:50',
      medium: 'yellow:50',
      low: 'green:40',
      none: 'gray:50',
    },
    severity: {
      critical: 'magenta:60',
      high: 'red:50',
      medium: 'orange:50',
      low: 'yellow:50',
      info: 'gray:50',
    },
  },
  light: {
    ...colorStyle.light,

    // Add custom colors here
    risk: {
      high: 'red:60',
      medium: 'yellow:50',
      low: 'green:50',
      none: 'gray:50',
    },
    severity: {
      critical: 'magenta:60',
      high: 'red:60',
      medium: 'orange:50',
      low: 'yellow:50',
      info: 'gray:50',
    },
  },
};

// Enable CSS variables
theme.config.useCSSVariables = true;

const Root = (props) => (
  <TonicProvider
    colorMode={{
      defaultValue: 'dark',
    }}
    colorStyle={{
      defaultValue: customColorStyle,
    }}
    theme={theme}
    useCSSBaseline={true}
  >
    <PortalManager>
      <ToastManager>
        <Layout>
          <Box {...props} />
        </Layout>
      </ToastManager>
    </PortalManager>
  </TonicProvider>
);

const Layout = (props) => {
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
        styles={css\`
          :root {
            color-scheme: \${colorMode};
          }
          :focus:not(:focus-visible) {
            outline: none;
          }
          body {
            font-size: \${fontSizes.sm};
            line-height: \${lineHeights.sm};
          }

          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background-color: \${colors[scrollbarTrackBackgroundColor]};
          }
          ::-webkit-scrollbar-thumb {
            background-color: \${colors[scrollbarThumbBackgroundColor]};
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: \${colors[scrollbarThumbHoverBackgroundColor]};
            border: 1px solid \${colors[scrollbarThumbHoverBorderColor]};
          }
        \`}
      />
      <Box
        backgroundColor={backgroundColor}
        color={color}
        fontSize="sm"
        lineHeight="sm"
        height="100vh"
        px="4x"
        py="3x"
        {...props}
      />
    </>
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
