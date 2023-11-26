import { Flex, Input, Space, Text, TextLabel } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex flexDirection="column">
    <TextLabel>Text label</TextLabel>
    <Space height="2x" />
    <Input placeholder="Text input" />
    <Space height="1x" />
    <Text size="xs">Help text for the text input</Text>
</Flex>
);

export default App;
