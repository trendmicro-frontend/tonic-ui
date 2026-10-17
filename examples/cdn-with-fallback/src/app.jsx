import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Box, Text, TonicProvider, useColorMode, useColorStyle,
} from '@tonic-ui/react';

function App({ runtime, onMounted }) {
  const [colorMode, setColorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const [manifest, setManifest] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', colorMode);
    const status = document.getElementById('bootstrap-status');
    if (status) {
      status.hidden = true;
    }
  }, [colorMode]);

  // The inspector frame syncs its color scheme with the visible shell and
  // reports completion to it; standalone documents have no parent and skip
  // both.
  useEffect(() => {
    if (window.parent === window) {
      return undefined;
    }
    const onMessage = (event) => {
      if (event.source === window.parent && event.origin === location.origin &&
        event.data?.type === 'cdn-runtime:color-mode' &&
        (event.data.value === 'dark' || event.data.value === 'light') &&
        event.data.value !== colorMode) {
        setColorMode(event.data.value);
      }
    };
    window.addEventListener('message', onMessage);
    window.parent.postMessage({ type: 'cdn-runtime:ready' }, location.origin);
    return () => window.removeEventListener('message', onMessage);
  }, [colorMode, setColorMode]);

  // The manifest lives beside the document in every output layout, so the app
  // reads the same file the bootstrap loaded. It shows the exact runtime the
  // application started with.
  useEffect(() => {
    let active = true;
    fetch(new URL('./runtime-manifest.json', location.href).href)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Cannot load the runtime manifest: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        if (active) {
          setManifest(text);
        }
      })
      .catch(error => {
        if (active) {
          setManifest(`${error.message}\n`);
        }
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (window.parent !== window) {
      const log = document.getElementById('bootstrap-log');
      window.parent.postMessage({
        type: 'cdn-runtime:complete',
        runtime: { ...runtime, log: log?.textContent },
      }, location.origin);
    }
    onMounted();
  }, [onMounted, runtime]);

  return (
    <>
      <Box p="6x" display="flex" flexDirection="column" alignItems="center" gap="2x">
        <Text as="h1" fontSize="xl" mb="1x">Demo app</Text>
      </Box>
      <Box p="4x" pb="6x" display="flex" flexDirection="column" alignItems="center" gap="2x" width="100%">
        <Box
          as="pre"
          id="runtime-manifest"
          width="100%"
          p="3x"
          backgroundColor={colorStyle.background.secondary}
          sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', maxWidth: '60rem' }}
        >
          {manifest ?? 'Loading manifest...\n'}
        </Box>
      </Box>
    </>
  );
}

export function mount(element, runtime) {
  const initialColorMode = new URL(location.href).searchParams.get('colorMode');
  const defaultValue = initialColorMode === 'dark' ? 'dark' : 'light';
  return new Promise(resolve => {
    createRoot(element).render(
      <TonicProvider colorMode={{ defaultValue }} useCSSBaseline={true} useCSSVariables={true}>
        <App runtime={runtime} onMounted={resolve} />
      </TonicProvider>,
    );
  });
}
