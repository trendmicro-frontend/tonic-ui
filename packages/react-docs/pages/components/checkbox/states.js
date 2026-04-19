import { Checkbox, Divider, Flex, Stack } from '@tonic-ui/react';
const App = () => (
  <Stack spacing="4x">
    <Flex columnGap="6x">
      <Checkbox>
        Label
      </Checkbox>
      <Checkbox indeterminate>
        Label
      </Checkbox>
      <Checkbox defaultChecked>
        Label
      </Checkbox>
    </Flex>
    <Divider />
    <Flex columnGap="6x">
      <Checkbox disabled>
        Label
      </Checkbox>
      <Checkbox disabled indeterminate>
        Label
      </Checkbox>
      <Checkbox disabled defaultChecked>
        Label
      </Checkbox>
    </Flex>
    <Flex columnGap="6x">
      <Flex alignItems="center" columnGap="2x">
        <Checkbox disabled />
        Label
      </Flex>
      <Flex alignItems="center" columnGap="2x">
        <Checkbox disabled indeterminate />
        Label
      </Flex>
      <Flex alignItems="center" columnGap="2x">
        <Checkbox disabled defaultChecked />
        Label
      </Flex>
    </Flex>
  </Stack>
);

export default App;
