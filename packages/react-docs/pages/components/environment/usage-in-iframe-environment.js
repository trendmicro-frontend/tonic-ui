import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import {
  Box,
  EnvironmentProvider,
  Stack,
  Text,
  TonicProvider,
  useColorMode,
  useColorStyle,
  useEnvironment,
} from '@tonic-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import BorderedBox from '@/components/BorderedBox';

const NONCE = process.env.NONCE ?? '';

const IFrame = ({ children, ...rest }) => {
  const [mountNode, setMountNode] = useState(null);
  const iframeRef = useRef(null);

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
      border="none"
      {...rest}
    >
      {mountNode && createPortal(children({ document: mountNode.ownerDocument }), mountNode)}
    </Box>
  );
};

// Reads the current environment and reports whether `getDocument()` / `getWindow()`
// resolve to the iframe's own realm or to the global (top-level) one.
const EnvironmentProbe = ({ frameDocument, title, description }) => {
  const [colorStyle] = useColorStyle();
  const { getDocument, getWindow } = useEnvironment();
  const isIframeDocument = getDocument() === frameDocument;
  const isIframeWindow = getWindow() === frameDocument.defaultView;

  return (
    <BorderedBox
      backgroundColor={colorStyle.background.primary}
      color={colorStyle.color.primary}
      fontSize="sm"
      lineHeight="sm"
      px="4x"
      py="3x"
    >
      <Text fontWeight="bold">{title}</Text>
      <Text mb="2x">{description}</Text>
      <Stack direction="column" spacing="1x">
        <Text>
          {isIframeDocument ? '✓' : '✗'} getDocument() {isIframeDocument ? 'is' : 'is not'} the iframe document
        </Text>
        <Text>
          {isIframeWindow ? '✓' : '✗'} getWindow() {isIframeWindow ? 'is' : 'is not'} the iframe window
        </Text>
      </Stack>
    </BorderedBox>
  );
};

const FrameContent = ({ frameDocument, colorMode }) => {
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
        useCSSBaseline
      >
        <Stack direction="column" spacing="4x" sx={{ p: '4x' }}>
          {/*
            * No environment configured: useEnvironment() falls back to the
            * global document/window, which is the top-level page — not the
            * iframe the component is actually rendered in.
            */}
          <EnvironmentProbe
            frameDocument={frameDocument}
            title="Without environment config"
            description="useEnvironment() falls back to the global (top-level) document and window."
          />
          {/*
            * environment configured to the iframe document: useEnvironment()
            * now resolves to the iframe's own document/window.
            */}
          <EnvironmentProvider value={frameDocument}>
            <EnvironmentProbe
              frameDocument={frameDocument}
              title="With environment set to the iframe document"
              description="environment={{ value: iframeDocument }} — useEnvironment() resolves to the iframe's document and window."
            />
          </EnvironmentProvider>
        </Stack>
      </TonicProvider>
    </CacheProvider>
  );
};

const App = () => {
  const [colorMode] = useColorMode();

  return (
    <IFrame
      title="Environment Context"
      sx={{
        width: '100%',
        height: 320,
      }}
    >
      {({ document: frameDocument }) => (
        <FrameContent colorMode={colorMode} frameDocument={frameDocument} />
      )}
    </IFrame>
  );
};

export default App;
