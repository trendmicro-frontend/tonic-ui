import {
  Autocomplete,
  AutocompleteInput,
  Box,
  Flex,
  Grid,
  Text,
} from '@tonic-ui/react';
import { useState } from 'react';
import { fruitItems } from './constants';

const App = () => {
  // Both `value` (selected item) and `inputValue` (input text) are controlled.
  // The hook syncs `inputValue` to `getItemLabel(value)` whenever `value` changes,
  // so the consumer's `onInputChange` receives the new label automatically.
  const [value, setValue] = useState(fruitItems[3]);
  const [inputValue, setInputValue] = useState(fruitItems[3].label);

  return (
    <Box>
      <Flex fontFamily="mono" mb="4x">
        <Grid
          columnGap="2x"
          rowGap="2x"
          templateColumns="auto 1fr"
        >
          <Text>inputValue:</Text>
          <Text>{JSON.stringify(inputValue)}</Text>
          <Text>value:</Text>
          <Text>{JSON.stringify(value)}</Text>
        </Grid>
      </Flex>
      <Autocomplete
        sx={{
          width: 400,
        }}
        autoHighlight
        inputValue={inputValue}
        isClearable
        items={fruitItems}
        onChange={setValue}
        onInputChange={setInputValue}
        portalled
        selectOnFocus
        value={value}
        renderInput={(params) => (
          <AutocompleteInput
            {...params}
            placeholder="Search fruits"
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
      />
    </Box>
  );
};

export default App;
