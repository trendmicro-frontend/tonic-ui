import { Box, Radio, RadioGroup, Stack, Text } from '@tonic-ui/react';
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
    { label: 'Symbol value: Set([1, 2, 3])', value: new Set([1, 2, 3]) },
    { label: 'Null value: null', value: null },
  ]);
  const [selectedValue, setSelectedValue] = useState();
  const handleChange = (value) => {
    setSelectedValue(value);
    console.log(value);
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
    </Box>
  );
};

export default App;
