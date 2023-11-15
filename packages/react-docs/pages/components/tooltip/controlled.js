import { Flex, Switch, Text, Tooltip } from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const [on, toggle] = useToggle(false);

  return (
    <>
      <Flex mb="4x">
        <Switch checked={on} onChange={toggle} />
      </Flex>
      <Tooltip
        label="This is a controlled tooltip"
        isOpen={on}
      >
        <Text display="inline-block">Text content</Text>
      </Tooltip>
    </>
  );
};

export default App;
