import {
  Flex,
  DropdownButton,
  Grid,
  Highlight,
  Text,
} from '@tonic-ui/react';
import { useState } from 'react';
import SearchDropdown from './SearchDropdown';

// Only the `label` property is required. Other fields are optional.
const items = [
  { id: 'all', label: 'All' },
  { id: 'network', label: 'Network events' },
  { id: 'system', label: 'System events' },
  { id: 'auth', label: 'Auth events' },
  { id: 'policy', label: 'Policy events' },
  { id: 'file', label: 'File events' },
  { id: 'registry', label: 'Registry events' },
];

const App = () => {
  const [value, setValue] = useState(items[0]);

  return (
    <>
      <Flex fontFamily="mono" mb="4x">
        <Grid
          columnGap="2x"
          rowGap="2x"
          templateColumns="auto 1fr"
        >
          <Text>value:</Text>
          <Text>{JSON.stringify(value)}</Text>
        </Grid>
      </Flex>
      <SearchDropdown
        sx={{ width: 240 }}
        items={items}
        value={value}
        onChange={setValue}
        renderItem={(item, { searchKeyword }) => (
          <Highlight variant="highlight" query={searchKeyword}>
            {item.label}
          </Highlight>
        )}
        renderToggle={({ renderItem, value }) => (
          <DropdownButton>
            {value ? renderItem(value) : 'Select…'}
          </DropdownButton>
        )}
      />
    </>
  );
};

export default App;
