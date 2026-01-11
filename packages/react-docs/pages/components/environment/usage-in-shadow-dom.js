import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import {
  Box,
  Text,
  TonicProvider,
  createTheme,
  useColorMode,
} from '@tonic-ui/react';
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import BorderedBox from '@/components/BorderedBox';

const ShadowDOMContainer = ({ children, colorMode }) => {
  const hostRef = useRef(null);
  const shadowRootElementRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    const shadowRootElement = document.createElement('div');
    shadowRoot.appendChild(shadowRootElement);
    shadowRootElementRef.current = shadowRootElement;
    rootRef.current = createRoot(shadowRootElement);

    return () => {
      setTimeout(() => {
        rootRef.current?.unmount();
        rootRef.current = null;
        shadowRootElementRef.current = null;
        shadowRoot.replaceChildren();
      }, 0);
    };
  }, []);

  useEffect(() => {
    const shadowRootElement = shadowRootElementRef.current;
    if (!(shadowRootElement instanceof HTMLElement)) {
      return;
    }
    const shadowRoot = shadowRootElement.parentNode;

    // Create Emotion cache with shadow root as container
    const cache = createCache({
      key: 'css',
      prepend: true,
      container: shadowRoot,
    });

    // Create theme with CSS variables scoped to :host
    const theme = createTheme({
      cssVariables: {
        prefix: 'tonic',
        rootSelector: ':host',
      },
    });

    const root = rootRef.current;
    root.render(
      <CacheProvider value={cache}>
        <TonicProvider
          colorMode={{
            value: colorMode,
          }}
          theme={theme}
        >
          {children}
        </TonicProvider>
      </CacheProvider>
    );
  }, [children, colorMode]);

  return <Box ref={hostRef} />;
};

const App = () => {
  const [colorMode] = useColorMode();

  return (
    <ShadowDOMContainer colorMode={colorMode}>
      <BorderedBox px="4x" py="2x">
        <Text>Component rendered inside Shadow DOM</Text>
      </BorderedBox>
    </ShadowDOMContainer>
  );
};

export default App;
