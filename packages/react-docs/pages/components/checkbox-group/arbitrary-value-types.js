import { Box, Checkbox, CheckboxGroup, Divider, Flex, Stack, Text } from '@tonic-ui/react';
import { useConst } from '@tonic-ui/react-hooks';
import React, { useState } from 'react';

const App = () => {
  const items = useConst(() => [
    { label: 'Array value: []', value: [] },
    { label: 'Array value: [1, 2, 3]', value: [1, 2, 3] },
    { label: 'Boolean value: false', value: false },
    { label: 'Boolean value: true', value: true },
    { label: 'Number value: 0', value: 0 },
    { label: 'Number value: Infinity', value: Infinity },
    { label: 'Object value: {"name":"John Doe"}', value: { name: 'John Doe' } },
    { label: 'Object value: {"render": ƒ (){}}', value: { render: function render() {} } },
    { label: 'String value: "value"', value: 'value' },
    { label: 'String value: "" (empty string)', value: '' },
    { label: 'Symbol value: Symbol("foo")', value: Symbol('foo') },
    { label: 'Set value: Set([1, 2, 3])', value: new Set([1, 2, 3]) },
    { label: 'Null value: null', value: null },
  ]);
  const [selectedValues, setSelectedValues] = useState([]);
  const selectedCount = selectedValues.length;
  const handleChange = (values) => {
    setSelectedValues(values);
    console.log(values);
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
        <Text>{selectedCount > 0 ? `${selectedCount} selected` : 'No items selected'}</Text>
      </Flex>
    </Box>
  );
};

export default App;
