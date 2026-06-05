import {
  Flex,
  Grid,
  Text,
} from '@tonic-ui/react';
import { useState } from 'react';
import { Dropdown, MenuButtonToggle } from '@/experiments/dropdown';

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
        sx={{
          width: 200,
        }}
        defaultValue={items[0]} // [optional] Initial value
        items={items}
        onChange={setValue}
        renderToggle={({ getToggleProps, value, renderItem }) => ( // [optional] Customize the toggle UI
          <MenuButtonToggle {...getToggleProps()}>
            {renderItem(value)}
          </MenuButtonToggle>
        )}
      />
    </>
  );
};

export default App;
