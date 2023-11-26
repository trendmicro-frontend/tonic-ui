import { Flex, Select } from '@tonic-ui/react';
import React from 'react';

const FlexOption = ({ style, ...props }) => (
  <Flex
    as="option"
    alignItems="center"
    height="8x"
    px="3x"
    {...props}
  />
);

const App = () => (
  <Select multiple size="4">
    <FlexOption value={1}>Option 1</FlexOption>
    <FlexOption value={2}>Option 2</FlexOption>
    <FlexOption value={3}>Option 3</FlexOption>
    <FlexOption value={4}>Option 4</FlexOption>
    <FlexOption value={5}>Option 5</FlexOption>
    <FlexOption value={6}>Option 6</FlexOption>
  </Select>
);

export default App;
