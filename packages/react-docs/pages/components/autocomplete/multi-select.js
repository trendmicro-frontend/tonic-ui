import {
  Autocomplete,
  Box,
  Flex,
  Grid,
  Highlight,
  Text,
} from '@tonic-ui/react';
import { isNullish } from '@tonic-ui/utils';
import { useCallback, useState } from 'react';
import TagInput from './components/TagInput';
import { fruitItems } from './constants';

const App = () => {
  const [values, setValues] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const filterItems = (items, { inputValue: query }) => {
    const q = query.trim().toLowerCase();
    const unpicked = items.filter(
      (item) => !values.some((s) => s.id === item.id)
    );
    if (!q) {
      return unpicked;
    }
    return unpicked.filter((item) => item.label.toLowerCase().includes(q));
  };

  const handleChange = useCallback((item) => {
    // `onChange` fires with `null` when the input is cleared (e.g.,
    // `closeBehavior="clear"` on dismiss). Guard so we don't push null into
    // the values array.
    if (isNullish(item)) {
      return;
    }
    setValues((prev) => [...prev, item]);
    // Reset the input so the next keystroke starts a fresh filter.
    setInputValue('');
  }, []);

  const removeAt = useCallback((index) => {
    setValues((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <Box>
      <Flex fontFamily="mono" mb="4x">
        <Grid
          columnGap="2x"
          rowGap="2x"
          templateColumns="auto 1fr"
        >
          <Text>values:</Text>
          <Text>{JSON.stringify(values)}</Text>
        </Grid>
      </Flex>
      <Autocomplete
        sx={{
          width: 400,
        }}
        autoHighlight
        closeBehavior="clear"
        filterItems={filterItems}
        inputValue={inputValue}
        isClearable
        items={fruitItems}
        onChange={handleChange}
        onInputChange={setInputValue}
        portalled
        renderInput={({ inputProps, onClearInput, ...params }) => (
          <TagInput
            {...params}
            // Wrap params' `onClearInput` so the clear (X) button removes chips along with the input.
            // Kept inline (instead of using Autocomplete's `onClearInput`) to avoid clearing chips on drift dismiss,
            // which also triggers `onClearInput` under `closeBehavior="clear"`.
            onClearInput={() => {
              setValues([]);
              onClearInput();
            }}
            tags={values.map((item) => item.id)}
            renderTag={(_, index) => values[index].label}
            onRemoveTag={removeAt}
            placeholder={values.length === 0 ? 'Search fruits' : ''}
            inputProps={{
              ...inputProps,
              // Backspace on an empty input removes the last chip.
              onKeyDown: (event) => {
                if (event.key === 'Backspace' && !inputProps.value && values.length > 0) {
                  removeAt(values.length - 1);
                  return;
                }
                inputProps.onKeyDown?.(event);
              },
            }}
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
    </Box>
  );
};

export default App;
