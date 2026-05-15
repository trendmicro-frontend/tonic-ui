import {
  Autocomplete,
  AutocompleteInput,
  Box,
  Flex,
  Grid,
  Highlight,
  Text,
} from '@tonic-ui/react';
import { isNullish } from '@tonic-ui/utils';
import { useCallback, useState } from 'react';
import { fruitItems } from './constants';

const App = () => {
  const [items, setItems] = useState(fruitItems);
  const [value, setValue] = useState(null);

  const filterItems = (items, { inputValue }) => {
    const q = inputValue.trim().toLowerCase();
    const filtered = q
      ? items.filter(item => item.label.toLowerCase().includes(q))
      : items;

    const exists = items.some(item => item.label.toLowerCase() === q);
    if (q && !exists) {
      return [
        ...filtered,
        {
          id: `__add__:${inputValue}`,
          label: `Add "${inputValue}"`,
          inputValue,
        },
      ];
    }
    return filtered;
  };

  const handleChange = useCallback((item) => {
    // `onChange` fires with `null` on clear; reflect that in the consumer state.
    if (isNullish(item)) {
      setValue(null);
      return;
    }
    // Synthetic "Add x" item carries `inputValue`; materialize it into a
    // real item before committing.
    if (item.inputValue !== undefined) {
      const newItem = { id: item.inputValue, label: item.inputValue };
      setItems(prev => [...prev, newItem]);
      setValue(newItem);
      return;
    }
    setValue(item);
  }, []);

  // Synthetic "Add X" items carry `inputValue` — prefer it so the typed text
  // (not the display label) is committed to the input. Avoids an `Add "Add X"`
  // feedback loop when filterItems re-runs on the freshly synced value.
  const getItemLabel = (item) => item.inputValue ?? item.label ?? item.id ?? '';

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
        filterItems={filterItems}
        getItemLabel={getItemLabel}
        isClearable
        items={items}
        onChange={handleChange}
        portalled
        selectOnFocus
        renderInput={(params) => (
          <AutocompleteInput
            {...params}
            placeholder="Search fruits"
          />
        )}
        renderItem={(item, { inputValue: query }) => {
          // Synthetic `Add "X"` items: render the label verbatim without highlighting
          if (item.inputValue !== undefined) {
            return item.label;
          }
          return (
            <Highlight variant="highlight" query={query}>
              {item.label}
            </Highlight>
          );
        }}
      />
    </Box>
  );
};

export default App;
