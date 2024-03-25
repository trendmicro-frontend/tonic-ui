import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { MDXProvider } from '@mdx-js/react';
import {
  Box,
  PortalManager,
  ToastManager,
  TonicProvider,
  colorStyle as defaultColorStyle,
  theme,
  useTheme,
} from '@tonic-ui/react';
import {
  useMediaQuery,
  useToggle,
} from '@tonic-ui/react-hooks';
import algoliasearch from 'algoliasearch/lite';
import { ensureString } from 'ensure-type';
import NextApp from 'next/app';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-core';
import GlobalStyles from '../components/GlobalStyles';
import Header from '../components/Header';
import MDXComponents from '../components/MDXComponents';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import TableOfContents from '../components/TableOfContents';

const NONCE = ensureString(process.env.NONCE);

// Algolia search client
const searchClient = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_SEARCH_API_KEY);

// Enable CSS variables replacement
theme.config.useCSSVariables = true;

const EmotionCacheProvider = ({
  children,
  nonce,
}) => {
  const cache = createCache({
    key: 'tonic-ui',
    nonce,
  });

  return (
    <CacheProvider value={cache}>
      {children}
    </CacheProvider>
  );
};

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
      <EmotionCacheProvider nonce={NONCE}>
        <TonicProvider
          key={initialColorMode} // Force re-render if color mode changes
          colorMode={{
            defaultValue: initialColorMode,
          }}
          colorStyle={{
            defaultValue: defaultColorStyle,
          }}
          theme={theme}
          useCSSBaseline
        >
          <PortalManager>
            <ToastManager
              TransitionProps={{
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
              }}
            >
              <MDXProvider components={MDXComponents}>
                <Page {...props} />
                <GlobalStyles />
              </MDXProvider>
            </ToastManager>
          </PortalManager>
        </TonicProvider>
      </EmotionCacheProvider>
    </InstantSearch>
  );
};

const DefaultPage = (props) => {
  return (
    <NextApp {...props} />
  );
};

const DocsPage = (props) => {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const containerRef = useRef();
  const isMediaQueryMatched = useMediaQuery(
    '(min-width: 1024px)',
  );
  const [isSidebarVisible, toggleSidebarVisible] = useToggle(isMediaQueryMatched ? true : false);
  const theme = useTheme();
  const headerHeight = theme.sizes['12x'];
  const handleDragResizableHandle = useCallback((e) => {
    const { left: parentLeft } = containerRef.current.getBoundingClientRect();
    const minWidth = 240;
    const maxWidth = 360;
    const canDrag = (e.clientX - parentLeft) >= minWidth && (e.clientX - parentLeft) <= maxWidth;
    if (canDrag) {
      const nextWidth = e.clientX - parentLeft;
      setSidebarWidth(nextWidth);
    }
  }, []);
  const handleCloseSidebar = () => {
    if (isSidebarVisible) {
      toggleSidebarVisible(false);
    }
  };
  const getResizableHandleStyleProps = () => {
    return {
      background: 'transparent',
      cursor: 'col-resize',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      width: '2x',
    };
  };
  const getSidebarStyleProps = () => {
    return {
      flexShrink: 0,
      width: {
        sm: isSidebarVisible ? sidebarWidth : 0,
        lg: sidebarWidth,
      },
      willChange: 'width',
      transition: {
        sm: 'width .2s ease-in-out',
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
      position: 'relative',
      ml: {
        sm: 0,
        lg: sidebarWidth,
      },
      pt: headerHeight,
      height: '100vh',
      width: {
        sm: '100%',
        lg: `calc(100% - ${sidebarWidth}px)`,
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
      ref={containerRef}
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
      >
        <Box
          draggable
          onDrag={handleDragResizableHandle}
          {...getResizableHandleStyleProps()}
        />
      </Sidebar>
      <Main
        onClick={handleCloseSidebar}
        sx={{
          '--docs-sidebar-width': `${sidebarWidth}px`,
        }}
        {...getMainStyleProps()}
      >
        <NextApp {...props} />
        <TableOfContents />
      </Main>
    </Box>
  );
};

export default App;
