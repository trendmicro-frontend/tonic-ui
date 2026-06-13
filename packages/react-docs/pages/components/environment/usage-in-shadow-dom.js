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
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import BorderedBox from '@/components/BorderedBox';

const NONCE = process.env.NONCE ?? '';

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
      nonce: NONCE,
      prepend: true,
      container: shadowRoot,
    });

    // Create theme with CSS variables scoped to :host
    const shadowTheme = createTheme({
      cssVariables: {
        prefix: 'tonic',
        rootSelector: ':host',
      },
      components: {
        Drawer: {
          defaultProps: {
            portalProps: {
              containerRef: shadowRootElementRef,
            },
          },
        },
        Modal: {
          defaultProps: {
            portalProps: {
              containerRef: shadowRootElementRef,
            },
          },
        },
        Popper: {
          defaultProps: {
            portalProps: {
              containerRef: shadowRootElementRef,
            },
          },
        },
        PortalManager: {
          defaultProps: {
            containerRef: shadowRootElementRef,
          },
        },
        ToastManager: {
          defaultProps: {
            containerRef: shadowRootElementRef,
          },
        },
      },
    });

    const root = rootRef.current;
    root.render(
      <CacheProvider value={cache}>
        <TonicProvider
          colorMode={{
            value: colorMode,
          }}
          environment={{
            value: shadowRoot,
          }}
          theme={shadowTheme}
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

  return <Box ref={hostRef} />;
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
