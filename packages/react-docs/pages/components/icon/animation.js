import { Flex, Icon, Space, Stack, Switch, Text } from '@tonic-ui/react';
import { ClockIcon, RedoIcon, SpinnerIcon, UndoIcon } from '@tonic-ui/react-icons';
import {
  useToggle,
} from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const [checked, toggle] = useToggle(true);
  const playState = checked ? 'running' : 'paused';

  return (<>
    <Flex mb="4x" alignItems="center">
      <Switch size="md" checked={checked} onChange={toggle} />
      <Space width="2x" />
      <Text>Toggle animation</Text>
    </Flex>
    <Stack direction="row" spacing="4x">
      <Icon as={SpinnerIcon} size="6x" spin animationPlayState={playState} />
      <Icon as={SpinnerIcon} size="6x" spin animationDuration="4s" animationPlayState={playState} />
      <Icon as={ClockIcon} size="6x" spin animationPlayState={playState} animationTimingFunction="steps(8)" />
      <Icon as={RedoIcon} size="6x" spin="cw" animationPlayState={playState} />
      <Icon as={UndoIcon} size="6x" spin="ccw" animationPlayState={playState} />
    </Stack>
  </>);
};

export default App;
