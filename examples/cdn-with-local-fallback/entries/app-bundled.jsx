// Normal application bundling: every dependency is a package specifier that the
// bundler resolves. Nothing here is external and no import map is involved.
import { createRoot } from 'react-dom/client';
import { Box, Button, TonicProvider, useColorMode } from '@tonic-ui/react';

window.__result = { error: null, hookValue: null, mountedAt: null };

// Same mount signal the measurement harness uses, so "App ready" is comparable.
const markMounted = () => {
  if (window.__result.mountedAt !== null) {
    return;
  }
  if (document.querySelector('#root button')) {
    window.__result.mountedAt = performance.now();
    return;
  }
  requestAnimationFrame(markMounted);
};
requestAnimationFrame(markMounted);

const App = () => {
  const [colorMode] = useColorMode();
  window.__result.hookValue = colorMode;

  return (
    <Box p="4x">
      <Button>{`rendered:${colorMode}`}</Button>
    </Box>
  );
};

createRoot(document.getElementById('root')).render(
  <TonicProvider colorMode={{ defaultValue: 'light' }}>
    <App />
  </TonicProvider>,
);
