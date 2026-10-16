import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Box, Button, Text, TonicProvider } from '@tonic-ui/react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Box p="4x">
      <Text as="h1" mb="3x">Tonic UI from a CDN</Text>
      <Button onClick={() => setCount(value => value + 1)}>Clicked {count} times</Button>
    </Box>
  );
}

createRoot(document.getElementById('root')).render(
  <TonicProvider useCSSBaseline={true} useCSSVariables={true}>
    <App />
  </TonicProvider>
);
