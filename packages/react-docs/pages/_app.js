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
} from '@tonic-ui/react';
import {
  useToggle,
} from '@tonic-ui/react-hooks';
import NextApp from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Content from '../components/Content';
import GlobalStyles from '../components/GlobalStyles';
import Header from '../components/Header';
import MDXComponents from '../components/MDXComponents';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import useMediaQuery from '../hooks/useMediaQuery';

const pageview = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

const customTheme = {
  ...theme,
};

const App = (props) => {
  const router = useRouter();

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
  }, [router]);

  const Page = (router.pathname === '/') ? DefaultPage : DocsPage;

  return (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider value="dark">
        <ColorStyleProvider>
          <ToastProvider>
            <MDXProvider components={MDXComponents}>
              <CSSBaseline />
              <GlobalStyles />
              <Page {...props} />
            </MDXProvider>
          </ToastProvider>
        </ColorStyleProvider>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

const DefaultPage = (props) => {
  return (
    <NextApp {...props} />
  );
};

const DocsPage = (props) => {
  const isMediaQueryMatched = useMediaQuery(
    '(min-width: 640px)',
  );
  const [isSidebarVisible, toggleSidebarVisible] = useToggle(isMediaQueryMatched ? true : false);
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const backgroundColor = {
    light: 'white',
    dark: 'gray:100',
  }[colorMode];
  const fontColor = {
    light: 'black:primary',
    dark: 'white:primary',
  }[colorMode];
  const headerHeight = theme.sizes['12x'];
  const handleCloseSidebar = () => {
    if (isSidebarVisible) {
      toggleSidebarVisible(false);
    }
  };
  const getSidebarStyleProps = () => {
    return {
      flexShrink: 0,
      width: {
        sm: isSidebarVisible ? 250 : 0,
        md: 250,
      },
      willChange: 'width',
      transition: {
        sm: 'width .3s ease-in-out',
        md: 'none',
      },
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'fixed',
      top: {
        sm: 0,
        md: headerHeight,
      },
      bottom: 0,
      left: 0,
      zIndex: 'fixed',
      whiteSpace: 'nowrap',
    };
  };
  const getMainStyleProps = () => {
    return {
      ml: {
        sm: 0,
        md: 250,
      },
      pt: headerHeight,
      width: {
        sm: '100%',
        md: 'calc(100% - 250px)',
      },
      willChange: 'width,margin',
      transition: {
        sm: 'width .3s ease-in-out, margin .3s ease-in-out',
        md: 'none',
      },
    };
  };

  // Hide the sidebar when the media query updates
  useEffect(() => {
    if (isSidebarVisible) {
      toggleSidebarVisible(false);
    }
  }, [isMediaQueryMatched]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      backgroundColor={backgroundColor}
      color={fontColor}
      fontSize="md"
      lineHeight="md"
    >
      <Header
        onToggle={() => {
          toggleSidebarVisible();
        }}
      />
      <Sidebar
        onClick={handleCloseSidebar}
        onClose={handleCloseSidebar}
        {...getSidebarStyleProps()}
      />
      <Main
        onClick={handleCloseSidebar}
        {...getMainStyleProps()}
      >
        <Content>
          <NextApp {...props} />
        </Content>
      </Main>
    </Box>
  );
};

export default App;
