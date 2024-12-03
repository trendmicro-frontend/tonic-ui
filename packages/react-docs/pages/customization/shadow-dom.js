import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Flex,
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
  Toast,
  ToastManager,
  TonicProvider,
  Tooltip,
  createTheme,
  useColorMode,
  usePortalManager,
  useToastManager,
} from '@tonic-ui/react';
import BorderedBox from '@/components/BorderedBox';
import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const NONCE = process.env.NONCE ?? '';

const DrawerComponent = ({ onClose }) => {
  return (
    <Drawer
      backdrop
      closeOnEsc
      closeOnOutsideClick
      isClosable
      isOpen
      onClose={onClose}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          Drawer
        </DrawerHeader>
        <DrawerBody>
          <Stack direction="column" spacing="4x">
            <Skeleton animation="pulse" width="80%" />
            <Skeleton animation="pulse" />
            <Skeleton animation="pulse" />
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Grid
            templateColumns="1fr 1fr"
            columnGap="2x"
          >
            <Button variant="primary" onClick={onClose}>
              OK
            </Button>
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
          </Grid>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const ModalComponent = ({ onClose }) => {
  return (
    <Modal
      closeOnEsc
      closeOnOutsideClick
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
          <Grid
            templateColumns="1fr 1fr"
            columnGap="2x"
          >
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

const ShadowDOMContainer = ({ children, colorMode, ...rest }) => {
  const containerRef = useRef();
  const shadowRootElementRef = useRef();
  const rootRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const shadowContainer = container.shadowRoot ?? container.attachShadow({ mode: 'open' });
    const shadowRootElement = document.createElement('div');
    shadowContainer.appendChild(shadowRootElement);
    shadowRootElementRef.current = shadowRootElement;
    rootRef.current = createRoot(shadowRootElement);

    return () => {
      setTimeout(() => {
        rootRef.current.unmount(); // Clean up React state
        rootRef.current = null;
        shadowRootElementRef.current = null; // Clear the reference
        shadowContainer.replaceChildren(); // Clear the shadow DOM content
      }, 0);
    };
  }, []); // Run only once on mount

  useEffect(() => {
    const shadowRootElement = shadowRootElementRef.current;
    if (!(shadowRootElement instanceof HTMLElement)) {
      console.error('The shadow root element is not an HTMLElement.');
      return;
    }
    const shadowContainer = shadowRootElement.parentNode;

    // https://emotion.sh/docs/@emotion/cache
    const cache = createCache({
      key: 'tonic-css',
      nonce: NONCE, // Needed to comply with Content Security Policy (CSP) for inline execution
      prepend: true,
      container: shadowContainer,
    });

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
          theme={shadowTheme}
        >
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
            <PortalManager>
              {children}
            </PortalManager>
          </ToastManager>
        </TonicProvider>
      </CacheProvider>
    );
  }, [children, colorMode]);

  return (
    <div ref={containerRef} {...rest} />
  );
};

const InsideShadowDOMComponent = () => {
  const portal = usePortalManager();
  const toast = useToastManager();
  const handleClickDrawer = () => {
    portal((close) => <DrawerComponent onClose={close} />);
  };
  const handleClickModal = () => {
    portal((close) => <ModalComponent onClose={close} />);
  };
  const handleClickToast = () => {
    const render = ({ id, onClose, placement }) => {
      const isTop = placement.includes('top');
      const toastSpacingKey = isTop ? 'pb' : 'pt';
      const styleProps = {
        [toastSpacingKey]: '2x',
        width: 320,
      };
      return (
        <Box sx={styleProps}>
          <Toast
            appearance="info"
            data-toast-id={id}
            isClosable
            onClose={onClose}
          >
            This is a toast notification
          </Toast>
        </Box>
      );
    };
    const options = {
      duration: 5000,
    };
    toast(render, options);
  };

  return (
    <BorderedBox py="4x" px="6x">
      <Text fontSize="lg" lineHeight="lg">
        Inside Shadow DOM
      </Text>
      <Divider my="4x" />
      <Flex columnGap="4x">
        <Button
          variant="secondary"
          onClick={handleClickDrawer}
        >
          Open Drawer
        </Button>
        <Button
          variant="secondary"
          onClick={handleClickModal}
        >
          Open Modal
        </Button>
        <Button
          variant="secondary"
          onClick={handleClickToast}
        >
          Show Toast Notification
        </Button>
        <Tooltip
          PopperProps={{
            usePortal: true,
          }}
          label="This is a tooltip"
        >
          <Button variant="secondary">
            Display Tooltip on Hover
          </Button>
        </Tooltip>
      </Flex>
    </BorderedBox>
  );
};

const OutsideShadowDOMComponent = () => {
  const portal = usePortalManager();
  const toast = useToastManager();
  const handleClickDrawer = () => {
    portal((close) => <DrawerComponent onClose={close} />);
  };
  const handleClickModal = () => {
    portal((close) => <ModalComponent onClose={close} />);
  };
  const handleClickToast = () => {
    const render = ({ id, onClose, placement }) => {
      const isTop = placement.includes('top');
      const toastSpacingKey = isTop ? 'pb' : 'pt';
      const styleProps = {
        [toastSpacingKey]: '2x',
        width: 320,
      };
      return (
        <Box sx={styleProps}>
          <Toast
            appearance="info"
            data-toast-id={id}
            isClosable
            onClose={onClose}
          >
            This is a toast notification
          </Toast>
        </Box>
      );
    };
    const options = {
      duration: 5000,
    };
    toast(render, options);
  };

  return (
    <BorderedBox py="4x" px="6x">
      <Text fontSize="lg" lineHeight="lg">
        Outside Shadow DOM
      </Text>
      <Divider my="4x" />
      <Flex columnGap="4x">
        <Button
          variant="secondary"
          onClick={handleClickDrawer}
        >
          Open Drawer
        </Button>
        <Button
          variant="secondary"
          onClick={handleClickModal}
        >
          Open Modal
        </Button>
        <Button
          variant="secondary"
          onClick={handleClickToast}
        >
          Show Toast Notification
        </Button>
        <Tooltip
          PopperProps={{
            usePortal: true,
          }}
          label="This is a tooltip"
        >
          <Button variant="secondary">
            Display Tooltip on Hover
          </Button>
        </Tooltip>
      </Flex>
    </BorderedBox>
  );
};

const App = () => {
  const [colorMode] = useColorMode();

  return (
    <Box
      sx={{
        'button': {
          opacity: '.65 !important',
        },
      }}
    >
      <Stack spacing="4x">
        <ShadowDOMContainer colorMode={colorMode}>
          <InsideShadowDOMComponent />
        </ShadowDOMContainer>
        <OutsideShadowDOMComponent />
      </Stack>
    </Box>
  );
};

export default App;
