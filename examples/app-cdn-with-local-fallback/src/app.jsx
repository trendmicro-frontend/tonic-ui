import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Box, Text, TonicProvider, useColorMode,
} from '@tonic-ui/react';

function App({ onMounted }) {
  const [colorMode] = useColorMode();

  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', colorMode);
    const status = document.getElementById('bootstrap-status');
    if (status) {
      status.hidden = true;
    }
  }, [colorMode]);

  useEffect(() => {
    onMounted();
  }, [onMounted]);

  return (
    <Box p="6x" display="flex" flexDirection="column" alignItems="center" gap="2x">
      <Text as="h1" fontSize="xl" mb="1x">Demo app</Text>
      <Text color="text.secondary">
        Application mounted on the shared runtime.
      </Text>
    </Box>
  );
}

export function mount(element, runtime) {
  const initialColorMode = new URL(location.href).searchParams.get('colorMode');
  const defaultValue = initialColorMode === 'dark' ? 'dark' : 'light';
  return new Promise(resolve => {
    createRoot(element).render(
      <TonicProvider colorMode={{ defaultValue }} useCSSBaseline={true} useCSSVariables={true}>
        <App onMounted={resolve} />
      </TonicProvider>,
    );
  });
}
