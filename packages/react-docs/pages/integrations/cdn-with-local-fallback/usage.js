import { Box, useColorMode } from '@tonic-ui/react';
import { useEffect, useRef, useState } from 'react';

const basePath = process.env.TONIC_UI_REACT_DOCS_BASE_PATH || '';
const demoSrc = `${basePath}/demos/cdn-with-local-fallback/index.html`;

const App = () => {
  const [colorMode] = useColorMode();
  const iframeRef = useRef(null);
  const initialSrc = useRef(`${demoSrc}?colorMode=${colorMode}`).current;
  const [iframeHeight, setIframeHeight] = useState(1000);

  useEffect(() => {
    const frame = iframeRef.current;
    const sendColorMode = (value) => frame?.contentWindow?.postMessage(
      { type: 'tonic-cdn-runtime:color-mode', value }, window.location.origin
    );
    const onMessage = (event) => {
      if (event.origin !== window.location.origin || event.source !== frame?.contentWindow) {
        return;
      }
      if (event.data?.type === 'tonic-cdn-runtime:ready') {
        sendColorMode(colorMode);
      } else if (event.data?.type === 'tonic-cdn-runtime:resize' &&
        Number.isFinite(event.data.height) && event.data.height > 0) {
        setIframeHeight(Math.ceil(event.data.height));
      }
    };
    window.addEventListener('message', onMessage);
    sendColorMode(colorMode);
    return () => window.removeEventListener('message', onMessage);
  }, [colorMode]);

  return (
    <Box
      as="iframe"
      ref={iframeRef}
      src={initialSrc}
      title="Standalone Tonic UI CDN and local runtime demonstration"
      border={1}
      borderColor="border.secondary"
      sx={{ width: '100%', height: iframeHeight + 2 }}
    />
  );
};

export default App;
