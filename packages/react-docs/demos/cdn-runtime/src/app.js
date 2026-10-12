import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Box, TonicProvider, useColorMode,
} from '@tonic-ui/react';

function App({ runtime, onMounted }) {
  const [colorMode, setColorMode] = useColorMode();

  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', colorMode);
    document.getElementById('bootstrap-status').hidden = true;
  }, [colorMode]);

  useEffect(() => {
    if (window.parent === window) {
      return undefined;
    }
    const onMessage = (event) => {
      if (event.source === window.parent && event.origin === location.origin &&
        event.data?.type === 'tonic-cdn-runtime:color-mode' &&
        (event.data.value === 'dark' || event.data.value === 'light') &&
        event.data.value !== colorMode) {
        setColorMode(event.data.value);
      }
    };
    window.addEventListener('message', onMessage);
    window.parent.postMessage({ type: 'tonic-cdn-runtime:ready' }, location.origin);
    return () => window.removeEventListener('message', onMessage);
  }, [colorMode, setColorMode]);

  useEffect(() => {
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'tonic-cdn-runtime:complete',
        runtime,
      }, location.origin);
    }
    onMounted();
  }, [onMounted, runtime]);

  return React.createElement(Box, {
    id: 'runtime-probe',
    hidden: true,
  }, 'Runtime mounted');
}

export function mount(element, runtime) {
  const initialColorMode = new URL(location.href).searchParams.get('colorMode');
  const defaultValue = initialColorMode === 'dark' ? 'dark' : 'light';
  return new Promise(resolve => {
    createRoot(element).render(React.createElement(TonicProvider, {
      colorMode: { defaultValue }, useCSSBaseline: true, useCSSVariables: true,
    }, React.createElement(App, { runtime, onMounted: resolve })));
  });
}
