import { css, Global } from '@emotion/react';
import { MDXProvider } from '@mdx-js/react';
import {
  Box,
  ColorModeProvider,
  ColorStyleProvider,
  CSSBaseline,
  ThemeProvider,
  ToastProvider,
  theme,
  useColorMode,
  useTheme,
} from '@trendmicro/react-styled-ui';
import App from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Header from '../components/Header';
import Main from '../components/Main';
import MDXComponents from '../components/MDXComponents';
import SideNav from '../components/SideNav';

const pageview = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

const customTheme = {
  ...theme,
};

const Layout = ({ children }) => {
  const [colorMode] = useColorMode();
  const { fontSizes, lineHeights } = useTheme();
  const backgroundColor = {
    light: 'white',
    dark: 'gray:100',
  }[colorMode];
  const fontColor = {
    light: 'black:primary',
    dark: 'white:primary',
  }[colorMode];

  return (
    <>
      <Global
        styles={css`
          body {
            font-size: ${fontSizes.sm};
            line-height: ${lineHeights.sm};
          }
        `}
      />
      <Box
        backgroundColor={backgroundColor}
        color={fontColor}
        fontSize="md"
        lineHeight="md"
      >
        <Header />
        <SideNav
          display={['none', null, 'block']}
          maxWidth="20rem"
        />
        <Box
          height="100vh"
          pt="12x"
        >
          <Main
            ml={[0, null, '20rem']}
          >
            {children}
          </Main>
        </Box>
      </Box>
    </>
  );
};

const CustomApp = (props) => {
  const router = useRouter();
  useEffect(() => {
    router.pathname === '/' && router.push(`${process.env.PUBLIC_URL}/getting-started`);
  }, [router]);

  // https://github.com/vercel/next.js/blob/canary/examples/with-react-ga/pages/_app.js
  useEffect(() => {
    ReactGA.initialize(process.env.GA_TRACKING_ID);
    // `routeChangeComplete` won't run for the first page load unless the query string is
    // hydrated later on, so here we log a page view if this is the first render and
    // there's no query string
    if (!router.asPath.includes('?')) {
      pageview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Listen for page changes after a navigation or when the query changes
    router.events.on('routeChangeComplete', pageview);
    return () => {
      router.events.off('routeChangeComplete', pageview);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider value="dark">
        <ColorStyleProvider>
          <ToastProvider>
            <CSSBaseline />
            <MDXProvider components={MDXComponents}>
              <Layout>
                <App {...props} />
              </Layout>
            </MDXProvider>
          </ToastProvider>
        </ColorStyleProvider>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default CustomApp;
