import { Divider, Flex, Stack, Switch } from '@tonic-ui/react';

const App = () => {
  return (
    <Stack spacing="4x">
      <Flex columnGap="6x">
        <Switch checked={false}>
          Label
        </Switch>
        <Switch checked={true}>
          Label
        </Switch>
      </Flex>
      <Divider />
      <Flex columnGap="6x">
        <Switch checked={false} disabled>
          Label
        </Switch>
        <Switch checked={true} disabled>
          Label
        </Switch>
      </Flex>
      <Divider />
      <Flex columnGap="6x">
        <Switch checked={false} readOnly>
          Label
        </Switch>
        <Switch checked={true} readOnly>
          Label
        </Switch>
      </Flex>
    </Stack>
  );
};

export default App;
