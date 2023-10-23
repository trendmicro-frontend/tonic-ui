import { Flex, Stack, Switch } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  return (
    <Stack spacing="6x">
      <Flex columnGap="6x">
        <Switch checked={false}>
          Label
        </Switch>
        <Switch checked={true}>
          Label
        </Switch>
      </Flex>
      <Flex columnGap="6x">
        <Switch checked={false} disabled>
          Label
        </Switch>
        <Switch checked={true} disabled>
          Label
        </Switch>
      </Flex>
    </Stack>
  );
};

export default App;
