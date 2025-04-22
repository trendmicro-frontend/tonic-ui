import { Stack, Text } from '@tonic-ui/react';
import React from 'react';
import BorderedBox from '@/components/BorderedBox';
import { For } from '@/experiments/for';

const App = () => {
  return (
    <Stack spacing="2x">
      <For
        items={[]}
        fallback={(
          <Text>No data to display</Text>
        )}
      >
        {(item, index) => (
          <BorderedBox
            key={index}
            p="4x"
          >
            {item}
          </BorderedBox>
        )}
      </For>
    </Stack>
  )
};

export default App;
