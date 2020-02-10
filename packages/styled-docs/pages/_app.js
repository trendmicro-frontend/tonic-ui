import { MDXProvider } from '@mdx-js/react';
import {
  Box,
  ColorModeProvider,
  CSSBaseline,
  ThemeProvider,
  useColorMode,
} from '@trendmicro/react-styled-core';
import App from 'next/app';
import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import MDXComponents from '../components/MDXComponents';
import SideNav from '../components/SideNav';

const Layout = ({ children }) => {
  const { colorMode } = useColorMode();
  const fontColor = {
    light: 'blackAlpha.primary',
    dark: 'whiteAlpha.primary',
  }[colorMode];

  return (
    <Box color={fontColor}>
      <Header zIndex="1" />
      <SideNav
        display={['none', null, 'block']}
        maxWidth="20rem"
        px="xl"
        py="lg"
      />
      <Box
        height="100vh"
        pt="4rem"
      >
        <Main
          fontSize="md"
          lineHeight="md"
          ml={[0, null, '20rem']}
        >
          {children}
        </Main>
      </Box>
    </Box>
  );
};

const CustomApp = (props) => (
  <ThemeProvider>
    <ColorModeProvider>
      <CSSBaseline />
      <MDXProvider components={MDXComponents}>
        <Layout>
          <App {...props} />
        </Layout>
      </MDXProvider>
    </ColorModeProvider>
  </ThemeProvider>
);

export default CustomApp;
