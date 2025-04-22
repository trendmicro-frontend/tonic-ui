import { Box, Button, Stack, Text } from '@tonic-ui/react';
import React, { useState } from 'react';
import BorderedBox from '@/components/BorderedBox';
import { Render } from '@/experiments/render';

const App = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <Stack spacing="2x">
      <Box>
        <Button
          variant="secondary"
          onClick={() => {
            setClicked(true);
          }}
        >
          {clicked ? 'Clicked' : 'Click Me'}
        </Button>
      </Box>
      <Render
        when={clicked}
        fallback={(
          <Text>Click the button to display the data</Text>
        )}
      >
        <Text>Data to display</Text>
      </Render>
    </Stack>
  )
};

export default App;
