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
  useColorMode,
  useColorStyle,
  usePortalManager,
} from '@tonic-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import BorderedBox from '@/components/BorderedBox';

const NONCE = process.env.NONCE ?? '';

const IFrame = ({ children, ...rest }) => {
  const [mountNode, setMountNode] = useState(null);
  const iframeRef = useRef(null);
  const styleProps = {
    border: 'none',
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentWindow?.document;
    if (!doc) {
      return;
    }

    setMountNode(doc.body);
  }, []);

  return (
    <Box
      as="iframe"
      ref={iframeRef}
      {...styleProps}
      {...rest}
    >
      {!!mountNode && createPortal(children({ document: mountNode.ownerDocument }), mountNode)}
    </Box>
  );
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

const FrameContent = () => {
  const portal = usePortalManager();
  const [colorStyle] = useColorStyle();

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
      height="100%"
    >
      <Box>
        <Text>Component rendered inside iframe</Text>
      </Box>
      <Box mt="3x">
        <Button variant="secondary" onClick={handleClickModal}>
          Open Modal
        </Button>
      </Box>
    </BorderedBox>
  );
};

const FrameContainer = ({ children, colorMode, frameDocument }) => {
  const cache = useMemo(() => {
    return createCache({
      key: 'css',
      nonce: NONCE,
      container: frameDocument?.head,
    });
  }, [frameDocument]);

  return (
    <CacheProvider value={cache}>
      <TonicProvider
        colorMode={{
          value: colorMode,
        }}
        environment={{
          value: frameDocument,
        }}
        useCSSBaseline
      >
        <ToastManager>
          <PortalManager>
            {children}
          </PortalManager>
        </ToastManager>
      </TonicProvider>
    </CacheProvider>
  );
};

const App = () => {
  const [colorMode] = useColorMode();

  return (
    <IFrame
      title="IFrame Context"
      sx={{
        width: '100%',
        height: 360,
      }}
    >
      {({ document: frameDocument }) => (
        <FrameContainer colorMode={colorMode} frameDocument={frameDocument}>
          <FrameContent />
        </FrameContainer>
      )}
    </IFrame>
  );
};

export default App;
