import {
  Dropdown,
  DropdownChip,
  Flex,
  Grid,
  OverflowTooltip,
  Text,
} from '@tonic-ui/react';
import { useState } from 'react';

// Only the `label` property is required. Other fields are optional.
const items = [
  { id: 'all', label: 'All' },
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
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
      <Dropdown
        sx={{ width: 200 }}
        items={items}
        value={value} // Controlled: the close button clears the selection
        onChange={setValue}
        renderToggle={({ renderItem, value }) => {
          const label = value ? renderItem(value) : 'Select…';
          return (
            <DropdownChip
              isClosable
              onClose={() => setValue(null)}
            >
              <OverflowTooltip label={label}>
                {label}
              </OverflowTooltip>
            </DropdownChip>
          );
        }}
      />
    </>
  );
};

export default App;
