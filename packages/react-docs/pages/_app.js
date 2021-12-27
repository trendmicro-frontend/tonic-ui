import { MDXProvider } from '@mdx-js/react';
import {
  ColorModeProvider,
  ColorStyleProvider,
  CSSBaseline,
  ThemeProvider,
  ToastProvider,
  theme,
} from '@tonic-ui/react';
import { ensureString } from 'ensure-type';
import NextApp from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import DocsPage from '../components/DocsPage';
import GlobalStyles from '../components/GlobalStyles';
import MDXComponents from '../components/MDXComponents';
import MainPage from '../components/MainPage';

const assetPrefix = ensureString(process.env.ASSET_PREFIX);

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

  const Page = (router.pathname === '/') ? MainPage : DocsPage;

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

export default App;
