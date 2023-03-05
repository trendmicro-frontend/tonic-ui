import { MDXProvider } from '@mdx-js/react';
import {
  Box,
  PortalManager,
  ToastManager,
  TonicProvider,
  colorStyle as defaultColorStyle,
  useTheme,
} from '@tonic-ui/react';
import {
  useMediaQuery,
  useToggle,
} from '@tonic-ui/react-hooks';
import algoliasearch from 'algoliasearch/lite';
import NextApp from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-hooks';
import GlobalStyles from '../components/GlobalStyles';
import Header from '../components/Header';
import MDXComponents from '../components/MDXComponents';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import TableOfContents from '../components/TableOfContents';
import '../styles.css';
 
// Algolia search client
const searchClient = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_SEARCH_API_KEY);

const App = (props) => {
  const [initialColorMode, setColorMode] = useState(null);
  const router = useRouter();

  useEffect(() => {
    /**
     * <html style="color-scheme: light;">
     */
    const root = document.documentElement;
    const colorScheme = root.style.getPropertyValue('color-scheme');
    root.setAttribute('data-color-scheme', colorScheme);
    if ((colorScheme === 'dark' || colorScheme === 'light') && (initialColorMode !== colorScheme)) {
      setColorMode(colorScheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!initialColorMode) {
    return null;
  }

  const Page = (router.pathname === '/') ? DefaultPage : DocsPage;

  return (
    <InstantSearch
      indexName={process.env.ALGOLIA_INDEX_NAME}
      searchClient={searchClient}
    >
      <Configure
        // https://www.algolia.com/doc/api-reference/search-api-parameters/
        hitsPerPage={1000}
        highlightPreTag="<mark>"
        highlightPostTag="</mark>"
      />
      <TonicProvider
        key={initialColorMode} // Force re-render if color mode changes
        colorMode={{
          defaultValue: initialColorMode,
        }}
        colorStyle={{
          defaultValue: defaultColorStyle,
        }}
        useCSSBaseline
      >
        <PortalManager>
          <ToastManager>
            <MDXProvider components={MDXComponents}>
              <Page {...props} />
              <GlobalStyles />
            </MDXProvider>
          </ToastManager>
        </PortalManager>
      </TonicProvider>
    </InstantSearch>
  );
};

const DefaultPage = (props) => {
  return (
    <NextApp {...props} />
  );
};

const DocsPage = (props) => {
  const isMediaQueryMatched = useMediaQuery(
    '(min-width: 1024px)',
  );
  const [isSidebarVisible, toggleSidebarVisible] = useToggle(isMediaQueryMatched ? true : false);
  const theme = useTheme();
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
        lg: 250,
      },
      willChange: 'width',
      transition: {
        sm: 'width .3s ease-in-out',
        lg: 'none',
      },
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'fixed',
      top: {
        sm: 0,
        lg: headerHeight,
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
        lg: 250,
      },
      pt: `calc(${headerHeight} + ${theme?.sizes['3x']})`,
      height: '100vh',
      width: {
        sm: '100%',
        lg: 'calc(100% - 250px)',
      },
      willChange: 'width,margin',
      transition: {
        sm: 'width .3s ease-in-out, margin .3s ease-in-out',
        lg: 'none',
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
        <NextApp {...props} />
        <TableOfContents />
      </Main>
    </Box>
  );
};

export default App;
