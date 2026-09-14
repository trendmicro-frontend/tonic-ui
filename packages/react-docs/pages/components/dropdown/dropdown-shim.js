import {
  Flex,
  Text,
} from '@tonic-ui/react';
import { useState } from 'react';
import DropdownShim from './DropdownShim';

// Only the `label` property is required. Other fields are optional.
const items = [
  { id: 'all', label: 'All' },
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
];

const App = () => {
  const [value, setValue] = useState(null);

  return (
    <Flex direction="column" rowGap="4x">
      <DropdownShim
        sx={{ width: 200 }}
        items={items}
        value={value}
        onChange={setValue}
      >
        {value ? value.label : 'Select…'}
      </DropdownShim>
      <Text fontFamily="mono">
        value: {JSON.stringify(value)}
      </Text>
    </Flex>
  );
};

export default App;
