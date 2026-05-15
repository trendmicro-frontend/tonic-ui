import {
  Autocomplete,
  AutocompleteInput,
  Box,
  Flex,
  Grid,
  Highlight,
  Text,
} from '@tonic-ui/react';
import {
  useState,
} from 'react';

// Only the `label` property is required. Other fields are optional.
const items = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two' },
  { id: 'three', label: 'Three' },
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
      <Autocomplete
        sx={{
          width: 400,
        }}
        autoHighlight
        defaultValue={items[0]} // [optional] Initial value
        getItemLabel={(item) => item.label} // [optional] Pass a custom `getItemLabel` when your items use a different label field (e.g. `.name` or `.title`)
        isClearable
        items={items}
        onChange={setValue}
        portalled
        selectOnFocus
        renderInput={(params) => (
          <AutocompleteInput
            {...params}
            placeholder="Search"
          />
        )}
        renderContent={({ items: filteredItems, renderItems }) => {
          if (filteredItems.length === 0) {
            return (
              <Box px="3x" py="2x">
                No items
              </Box>
            );
          }
          return renderItems(filteredItems);
        }}
        renderItem={(item, { inputValue: query }) => (
          <Highlight variant="highlight" query={query}>
            {item.label}
          </Highlight>
        )}
      />
    </>
  );
};

export default App;
