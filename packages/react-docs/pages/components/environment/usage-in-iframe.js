import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { Box, Text, TonicProvider } from '@tonic-ui/react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { useMemo } from 'react';

const FrameContent = ({ frameDocument }) => {
  const cache = useMemo(() => {
    return createCache({
      key: 'css',
      container: frameDocument.head,
    });
  }, [frameDocument]);

  return (
    <CacheProvider value={cache}>
      <TonicProvider
        environment={{
          value: () => frameDocument,
        }}
        useCSSBaseline
      >
        <Box
          fontSize="sm"
          lineHeight="sm"
          px="4x"
          py="2x"
        >
          <Text>Component rendered inside iframe</Text>
        </Box>
      </TonicProvider>
    </CacheProvider>
  );
};

const App = () => (
  <Frame
    title="IFrame Context"
    style={{
      border: 'none',
      width: '100%',
    }}
  >
    <FrameContextConsumer>
      {({ document: frameDocument }) => (
        <FrameContent frameDocument={frameDocument} />
      )}
    </FrameContextConsumer>
  </Frame>
);

export default App;
