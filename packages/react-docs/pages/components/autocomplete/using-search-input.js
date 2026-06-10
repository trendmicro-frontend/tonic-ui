import {
  Autocomplete,
  Box,
  Flex,
  Grid,
  Highlight,
  SearchInput,
  Text,
} from '@tonic-ui/react';
import { useState } from 'react';
import { fruitItems } from './constants';

const App = () => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleClear = (event) => {
    // Prevent the popup from reopening when the clear button is clicked
    event.preventDefault();

    setInputValue('');
    setValue(null);
  };

  return (
    <Box>
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
        inputValue={inputValue}
        items={fruitItems}
        onChange={setValue}
        onInputChange={setInputValue}
        portalled
        selectOnFocus
        renderInput={({ ref, inputProps }) => {
          // SearchInput forwards `ref` to the inner <input>, so we wrap it in a container
          // to ensure the Popper anchors to the visible outer border.
          // It also uses `value` to control clear-button visibility, so we forward
          // `inputProps.value` to the top-level `value` prop.
          return (
            <Box ref={ref}>
              <SearchInput
                value={inputProps.value}
                slotProps={{ input: inputProps }}
                onClearInput={handleClear}
                placeholder="Search fruits"
              />
            </Box>
          );
        }}
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
    </Box>
  );
};

export default App;
