import { useEnvironment } from '@tonic-ui/react';
import { Box, Text } from '@tonic-ui/react';
import { useEffect, useState } from 'react';

const App = () => {
  const { getWindow } = useEnvironment();
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const win = getWindow();

    const updateSize = () => {
      setSize({
        width: win.innerWidth,
        height: win.innerHeight,
      });
    };

    updateSize();
    win.addEventListener('resize', updateSize);

    return () => win.removeEventListener('resize', updateSize);
  }, [getWindow]);

  return (
    <Box>
      <Text>Viewport: {size.width} x {size.height}</Text>
    </Box>
  );
};

export default App;
