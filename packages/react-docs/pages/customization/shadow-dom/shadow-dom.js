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
  useToastManager,
} from '@tonic-ui/react';
import {
  useToggle,
} from '@tonic-ui/react-hooks';
import BorderedBox from '@/components/BorderedBox';
import { useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

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

const DrawerComponent = ({ isOpen, onClose }) => {
  return (
    <Drawer
      backdrop
      closeOnEsc
      closeOnInteractOutside
      isClosable
      isOpen={isOpen}
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

const ModalComponent = ({ isOpen, onClose }) => {
  return (
    <Modal
      closeOnEsc
      closeOnInteractOutside
      isClosable
      isOpen={isOpen}
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
        key: 'tonic-css',
        nonce: NONCE,
        prepend: true,
        container: shadowDOMRef.current.shadowRoot,
      });
    }

    if (!themeRef.current) {
      themeRef.current = createTheme({
        cssVariables: {
          prefix: 'tonic',
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
          <ToastManager
            slotProps={{
              transition: {
                sx: {
                  '[data-toast-placement^="top"] > &:first-of-type': {
                    mt: '4x',
                  },
                  '[data-toast-placement^="bottom"] > &:last-of-type': {
                    mb: '4x',
                  },
                  '[data-toast-placement$="left"] > &': {
                    ml: '4x',
                  },
                  '[data-toast-placement$="right"] > &': {
                    mr: '4x',
                  },
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

  // Cleanup runs only on unmount — destroys the shadow tree
  useLayoutUnmount(() => {
    shadowDOMRef.current?.unmount();
    shadowDOMRef.current = null;
    cacheRef.current = null;
    themeRef.current = null;
  });

  return (
    <Box ref={containerRef} {...rest} />
  );
};

const InsideShadowDOMComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useToggle(false);
  const [isModalOpen, setIsModalOpen] = useToggle(false);
  const toast = useToastManager();

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          onClick={handleOpenDrawer}
        >
          Open Drawer
        </Button>
        <Button
          variant="secondary"
          onClick={handleOpenModal}
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
          portalled
          label="This is a tooltip"
        >
          <Button variant="secondary">
            Display Tooltip on Hover
          </Button>
        </Tooltip>
      </Flex>
      <DrawerComponent isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
      <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal} />
    </BorderedBox>
  );
};

const OutsideShadowDOMComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useToggle(false);
  const [isModalOpen, setIsModalOpen] = useToggle(false);
  const toast = useToastManager();

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          onClick={handleOpenDrawer}
        >
          Open Drawer
        </Button>
        <Button
          variant="secondary"
          onClick={handleOpenModal}
        >
          Open Modal
        </Button>
        <Button
          variant="secondary"
          onClick={handleClickToast}
        >
          Show Toast Notification
        </Button>
        <Tooltip label="This is a tooltip">
          <Button variant="secondary">
            Display Tooltip on Hover
          </Button>
        </Tooltip>
      </Flex>
      <DrawerComponent isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
      <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal} />
    </BorderedBox>
  );
};

const App = () => {
  const [colorMode] = useColorMode();

  return (
    <>
      <OutsideShadowDOMComponent />
      <ShadowDOMContainer colorMode={colorMode}>
        <InsideShadowDOMComponent />
      </ShadowDOMContainer>
    </>
  );
};

export default App;
