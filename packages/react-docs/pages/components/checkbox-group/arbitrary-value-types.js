import { Box, Checkbox, CheckboxGroup, Divider, Flex, Stack, Text } from '@tonic-ui/react';
import { useConst } from '@tonic-ui/react-hooks';
import React, { useState } from 'react';

const App = () => {
  const items = useConst(() => [
    { label: 'String value: "apple"', value: 'apple' },
    { label: 'Number value: 0', value: 0 },
    { label: 'Object value: {"value":"apple"}', value: { value: 'apple' } },
  ]);
  const [selectedValues, setSelectedValues] = useState(['apple']);

  const handleChange = (values) => {
    setSelectedValues(values);
  };

  return (
    <Box>
      <CheckboxGroup
        value={selectedValues}
        onChange={handleChange}
      >
        <Stack direction="column" spacing="1x" shouldWrapChildren>
          {items.map((item, index) => (
            <Checkbox key={index} value={item.value}>
              <Text>{item.label}</Text>
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
      <Divider my="4x" />
      <Flex alignItems="center" columnGap="1x">
        <Text>Selected values:</Text>
        <Text>{selectedValues.length === 0 ? 'None' : JSON.stringify(selectedValues)}</Text>
      </Flex>
    </Box>
  );
};

export default App;
