import {
  Box,
  DropdownButton,
  Highlight,
  OverflowTooltip,
} from '@tonic-ui/react';
import { useConst } from '@tonic-ui/react-hooks';
import SearchDropdown from '../dropdown/SearchDropdown';

const App = () => {
  const items = useConst(() => [
    { value: 'apple', label: 'Apple' },
    { value: 'apricot', label: 'Apricot' },
    { value: 'avocado', label: 'Avocado' },
    { value: 'banana', label: 'Banana' },
    { value: 'blackberry', label: 'Blackberry' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'coconut', label: 'Coconut' },
    { value: 'cranberry', label: 'Cranberry' },
    { value: 'dragon-fruit', label: 'Dragon Fruit' },
    { value: 'grape', label: 'Grape' },
    { value: 'grapefruit', label: 'Grapefruit' },
    { value: 'guava', label: 'Guava' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'lemon', label: 'Lemon' },
    { value: 'lime', label: 'Lime' },
    { value: 'mango', label: 'Mango' },
    { value: 'melon', label: 'Melon' },
    { value: 'orange', label: 'Orange' },
    { value: 'papaya', label: 'Papaya' },
    { value: 'peach', label: 'Peach' },
    { value: 'pear', label: 'Pear' },
    { value: 'pineapple', label: 'Pineapple' },
    { value: 'plum', label: 'Plum' },
    { value: 'raspberry', label: 'Raspberry' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'watermelon', label: 'Watermelon' },
  ]);

  return (
    <Box width={200}>
      <SearchDropdown
        items={items}
        renderItem={(item, { searchKeyword }) => (
          <Highlight variant="highlight" query={searchKeyword}>
            {item.label}
          </Highlight>
        )}
        renderToggle={({ value }) => {
          const label = value
            ? `Selected fruit: ${value.label}`
            : 'Select a fruit';
          return (
            <DropdownButton
              sx={{
                maxWidth: '100%',
                width: '100%',
                '> :first-of-type': {
                  textAlign: 'left',
                  minWidth: 0,
                },
              }}
            >
              <OverflowTooltip label={label}>
                {label}
              </OverflowTooltip>
            </DropdownButton>
          );
        }}
      />
    </Box>
  );
};

export default App;
