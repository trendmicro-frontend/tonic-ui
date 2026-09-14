import {
  Button,
  Dropdown,
  DropdownToggle,
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
        defaultValue={items[0]} // [optional] Initial value
        items={items}
        onChange={setValue}
        renderToggle={({ renderItem, value }) => (
          <DropdownToggle>
            {({ getToggleProps }) => (
              <Button
                variant="secondary"
                sx={{
                  justifyContent: 'flex-start',
                  maxWidth: '100%',
                  width: '100%',
                  minWidth: 0, // Override the default `minWidth: auto` for flex items to enable text truncation
                }}
                {...getToggleProps()}
              >
                <OverflowTooltip label={renderItem(value)}>
                  {renderItem(value)}
                </OverflowTooltip>
              </Button>
            )}
          </DropdownToggle>
        )}
      />
    </>
  );
};

export default App;
