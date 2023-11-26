import { Button, Flex, Space, Stack, Textarea, TextLabel } from '@tonic-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [resize, setResize] = useState('both');

  return (
    <>
      <Flex alignItems="center" mb="5x">
        <TextLabel>resize =</TextLabel>
        <Space width="2x" />
        <Stack direction="row" spacing="2x">
          {['none', 'both', 'horizontal', 'vertical'].map(value => (
            <Button
              key={value}
              variant={resize === value ? 'primary' : 'secondary'}
              onClick={() => setResize(value)}
            >
              {value}
            </Button>
          ))}
        </Stack>
      </Flex>
      <Textarea
        defaultValue="Placeholder text"
        width="auto"
        resize={resize}
        rows="3"
        cols="12"
        minLength={4}
        maxLength={16}
        transition="none"
      />
    </>
  );
};

export default App;
