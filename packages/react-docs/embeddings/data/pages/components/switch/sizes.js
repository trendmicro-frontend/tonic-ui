import { Flex, Switch } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  return (
  <Flex columnGap="6x">
    <Switch size="sm">
      Label
    </Switch>
    <Switch size="md">
      Label
    </Switch>
    <Switch size="lg">
      Label
    </Switch>
  </Flex>
  );
};

export default App;
