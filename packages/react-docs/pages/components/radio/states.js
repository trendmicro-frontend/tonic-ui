import { Divider, Flex, Radio, Stack } from '@tonic-ui/react';
const App = () => (
  <Stack spacing="4x">
    <Flex columnGap="6x">
      <Radio>
        Label
      </Radio>
      <Radio defaultChecked>
        Label
      </Radio>
    </Flex>
    <Divider />
    <Flex columnGap="6x">
      <Radio disabled>
        Label
      </Radio>
      <Radio disabled defaultChecked>
        Label
      </Radio>
    </Flex>
    <Flex columnGap="6x">
      <Flex alignItems="center" columnGap="2x">
        <Radio disabled />
        Label
      </Flex>
      <Flex alignItems="center" columnGap="2x">
        <Radio disabled defaultChecked />
        Label
      </Flex>
    </Flex>
  </Stack>
);

export default App;
