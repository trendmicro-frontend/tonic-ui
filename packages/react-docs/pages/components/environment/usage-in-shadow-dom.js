import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import {
  Box,
  Button,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  PortalManager,
  Skeleton,
  Stack,
  Text,
  ToastManager,
  TonicProvider,
  createTheme,
  useColorMode,
  useColorStyle,
  usePortalManager,
} from '@tonic-ui/react';
import { useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import BorderedBox from '@/components/BorderedBox';

const NONCE = process.env.NONCE ?? '';

const createShadowDOM = (container) => {
  if (!(container instanceof Element)) {
    throw new Error('createShadowDOM: container must be a DOM Element');
  }

  const shadowRoot = container.shadowRoot ?? container.attachShadow({ mode: 'open' });

  shadowRoot.replaceChildren();
  const mountElement = document.createElement('div');
  mountElement.setAttribute('data-shadow-root', 'true');
  mountElement.style.display = 'contents';
  shadowRoot.appendChild(mountElement);

  const root = createRoot(mountElement);

  return {
    shadowRoot,
    render: (children) => root.render(children),
    unmount: () => root.unmount(),
  };
};

const useLayoutUnmount = (fn) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useLayoutEffect(() => () => fnRef.current(), []);
};

const ModalComponent = ({ onClose }) => {
  return (
    <Modal
      closeOnEsc
      closeOnInteractOutside
      isClosable
      isOpen
      onClose={onClose}
      size="sm"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Modal
        </ModalHeader>
        <ModalBody>
          <Stack direction="column" spacing="4x">
            <Skeleton animation="pulse" width="80%" />
            <Skeleton animation="pulse" />
            <Skeleton animation="pulse" />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Grid templateColumns="1fr 1fr" columnGap="2x">
            <Button variant="primary" onClick={onClose}>
              OK
            </Button>
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
          </Grid>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ShadowDOMContent = () => {
  const [colorStyle] = useColorStyle();
  const portal = usePortalManager();

  const handleClickModal = () => {
    portal((close) => <ModalComponent onClose={close} />);
  };

  return (
    <BorderedBox
      backgroundColor={colorStyle.background.primary}
      color={colorStyle.color.primary}
      fontSize="sm"
      lineHeight="sm"
      px="4x"
      py="2x"
    >
      <Box>
        <Text>Component rendered inside Shadow DOM</Text>
      </Box>
      <Box mt="3x">
        <Button variant="secondary" onClick={handleClickModal}>
          Open Modal
        </Button>
      </Box>
    </BorderedBox>
  );
};

const ShadowDOMContainer = ({ children, colorMode }) => {
  const containerRef = useRef();
  const shadowDOMRef = useRef();
  const cacheRef = useRef();
  const themeRef = useRef();

  // Re-runs on [children, colorMode] change — re-renders the shadow tree (reconcile)
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    if (!shadowDOMRef.current) {
      shadowDOMRef.current = createShadowDOM(container);
    }

    if (!cacheRef.current) {
      cacheRef.current = createCache({
        key: 'tonic-ui-css',
        nonce: NONCE,
        prepend: true,
        container: shadowDOMRef.current.shadowRoot,
      });
    }

    // Create theme with CSS variables scoped to :container. Portal-based components
    // (Modal, Drawer, Popper, ToastManager, PortalManager) resolve their portal
    // container from the DOM tree they are mounted in (the shadow root), so they render
    // inside the shadow root automatically — no per-component `containerRef` is needed.
    // The `environment` config below is for resolving `getDocument()`/`getWindow()`
    // to the correct realm, not for portal placement.
    if (!themeRef.current) {
      themeRef.current = createTheme({
        cssVariables: {
          prefix: 'tonic-ui',
          rootSelector: ':host',
        },
      });
    }

    shadowDOMRef.current.render(
      <CacheProvider value={cacheRef.current}>
        <TonicProvider
          colorMode={{
            value: colorMode,
          }}
          environment={{
            value: shadowDOMRef.current.shadowRoot,
          }}
          theme={themeRef.current}
        >
          <ToastManager>
            <PortalManager>
              {children}
            </PortalManager>
          </ToastManager>
        </TonicProvider>
      </CacheProvider>
    );
  }, [children, colorMode]);

  // Cleanup runs only on unmount — destroys the shadow tree
  useLayoutUnmount(() => {
    shadowDOMRef.current?.unmount();
    shadowDOMRef.current = null;
    cacheRef.current = null;
    themeRef.current = null;
  });

  return <Box ref={containerRef} />;
};

const App = () => {
  const [colorMode] = useColorMode();

  return (
    <ShadowDOMContainer colorMode={colorMode}>
      <ShadowDOMContent />
    </ShadowDOMContainer>
  );
};

export default App;
