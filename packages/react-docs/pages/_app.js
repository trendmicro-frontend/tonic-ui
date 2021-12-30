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
  useHydrated,
  useToggle,
} from '@tonic-ui/react-hooks';
import { ensureBoolean } from 'ensure-type';
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
  const isHydrated = useHydrated();
  const isMediaQueryMatched = useMediaQuery(
    '(min-width: 640px)',
  );
  const isDesktopMode = ensureBoolean(isMediaQueryMatched);
  const isMobileMode = ensureBoolean(!isMediaQueryMatched);
  const [isSidebarVisible, toggleSidebarVisible] = useToggle(isDesktopMode ? true : false);
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
  const top = theme.sizes['12x'];
  const height = `calc(100vh - ${top})`;
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
      transition: isMobileMode ? 'width .3s ease-in-out' : 'none',
      height,
      overflowY: 'auto',
      overflowX: 'hidden',
      position: {
        sm: 'fixed',
        md: 'sticky',
      },
      mt: {
        sm: 0,
        md: top,
      },
      top,
      left: 0,
      zIndex: {
        sm: 'fixed',
        md: 'base',
      },
    };
  };

  // Hide the sidebar when the media query updates
  useEffect(() => {
    if (isSidebarVisible) {
      toggleSidebarVisible(false);
    }
  }, [isMediaQueryMatched]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isHydrated) {
    return null;
  }

  return (
    <Box
      backgroundColor={backgroundColor}
      color={fontColor}
      fontSize="md"
      lineHeight="md"
    >
      <Header
        isDesktopMode={isDesktopMode}
        isMobileMode={isMobileMode}
        onToggle={() => {
          toggleSidebarVisible();
        }}
      />
      <Main onClick={handleCloseSidebar}>
        <Box display="flex">
          <Sidebar
            isDesktopMode={isDesktopMode}
            isMobileMode={isMobileMode}
            onClick={handleCloseSidebar}
            {...getSidebarStyleProps()}
          />
          <Box pt={top} width="100%">
            <Content>
              <NextApp {...props} />
            </Content>
          </Box>
        </Box>
      </Main>
    </Box>
  );
};

export default App;
