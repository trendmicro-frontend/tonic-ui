import { Box, Link, Stack } from '@tonic-ui/react';

const basePath = process.env.TONIC_UI_REACT_DOCS_BASE_PATH || '';
const demoSrc = `${basePath}/demos/cdn-runtime/index.html`;

const App = () => (
  <Stack direction="column" spacing="3x">
    <Link href={demoSrc} target="_blank" rel="noopener noreferrer">
      Open standalone CDN-first demo in a new window ↗
    </Link>
    <Box
      as="iframe"
      src={demoSrc}
      title="Standalone Tonic UI CDN and local runtime demonstration"
      border={1}
      borderColor="border.secondary"
      sx={{ width: '100%', height: 1000 }}
    />
  </Stack>
);

export default App;
