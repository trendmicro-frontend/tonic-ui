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

export const getRootIndex = () => `
import { Global, css } from '@emotion/react';
import {
  Box,
  PortalManager,
  ToastManager,
  TonicProvider,
  colorStyle,
  useColorMode,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import Demo from './demo';

const App = (props) => (
  <TonicProvider
    colorMode={{
      defaultValue: 'dark',
    }}
    colorStyle={{
      defaultValue: colorStyle,
    }}
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
        {...props}
      />
    </>
  );
};

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <App>
      <Demo />
    </App>
  </React.StrictMode>
);
`.trim();

export const getDefaultComponent = () => `
import { Box } from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const Component = forwardRef((props, ref) => {
  const styleProps = {
    px: '4x',
    py: '3x',
  };

  return (
    <Box ref={ref} {...styleProps} {...props}>
      Tonic UI is awesome
    </Box>
  );
});

export default Component;
`.trim();
