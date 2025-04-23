import { Box, Divider, Flex, Radio, RadioGroup, Stack, Text } from '@tonic-ui/react';
import { useConst } from '@tonic-ui/react-hooks';
import React, { useState } from 'react';

const App = () => {
  const items = useConst(() => [
    { label: 'String value: "1"', value: '1' },
    { label: 'Number value: 2', value: 2 },
    { label: 'Object value: {"value":3}', value: { value: 3 } },
  ]);
  const [selectedValue, setSelectedValue] = useState('1');
  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <Box>
      <RadioGroup
        value={selectedValue}
        onChange={handleChange}
      >
        <Stack direction="column" spacing="1x" shouldWrapChildren>
          {items.map((item, index) => (
            <Radio key={index} value={item.value}>
              <Text>{item.label}</Text>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Divider my="4x" />
      <Flex alignItems="center" columnGap="1x">
        <Text>Selected value:</Text>
        <Text>{selectedValue === null ? 'None' : JSON.stringify(selectedValue)}</Text>
      </Flex>
    </Box>
  );
};

export default App;
