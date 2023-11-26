import {
  Flex,
  Icon,
  Space,
  Stack,
  Switch,
  Text,
} from '@tonic-ui/react';
import {
  useToggle,
} from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const [checked, toggle] = useToggle(true);
  const playState = checked ? 'running' : 'paused';

  return (
    <>
      <Flex mb="4x" alignItems="center">
        <Switch size="md" checked={checked} onChange={toggle} />
        <Space width="2x" />
        <Text>Toggle animation</Text>
      </Flex>
      <Stack direction="row" spacing="4x">
        <Icon icon="spinner" size="6x" spin animationPlayState={playState} />
        <Icon icon="spinner" size="6x" spin animationDuration="4s" animationPlayState={playState} />
        <Icon icon="clock" size="6x" spin animationPlayState={playState} animationTimingFunction="steps(8)" />
        <Icon icon="redo" size="6x" spin="cw" animationPlayState={playState} />
        <Icon icon="undo" size="6x" spin="ccw" animationPlayState={playState} />
      </Stack>
    </>
  );
};

export default App;
