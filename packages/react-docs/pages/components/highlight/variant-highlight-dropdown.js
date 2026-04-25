import {
  Box,
  Highlight,
  OverflowTooltip,
  Scrollbar,
} from '@tonic-ui/react';
import { useConst } from '@tonic-ui/react-hooks';
import { useMemo, useState } from 'react';
import { MenuButtonToggle } from '@/experiments/dropdown';
import { SearchDropdown } from '@/experiments/search-dropdown';

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
  const itemValueToLabelMap = useMemo(() => {
    return Object.fromEntries(items.map(item => [item.value, item.label]));
  }, [items]);

  const [value, setValue] = useState('');

  const handleSelect = (item) => {
    setValue(item.value);
  };

  const dropdownLabel = !value
    ? 'Select a fruit'
    : `Selected fruit: ${itemValueToLabelMap[value]}`;

  return (
    <Box width={200}>
      <SearchDropdown
        items={items}
        onSelect={handleSelect}
        renderContent={({ items, renderItems, renderSearchInput }) => (
          <>
            <Box px="3x" mb="2x">
              {renderSearchInput()}
            </Box>
            {items.length === 0 ? (
              <Box px="3x" py="2x">No options</Box>
            ) : (
              <Scrollbar
                maxHeight={36 * 5}
                overflowY="visible"
              >
                {renderItems(items)}
              </Scrollbar>
            )}
          </>
        )}
        renderItem={(item, { searchKeyword }) => (
          <Highlight variant="highlight" query={searchKeyword}>
            {item.label}
          </Highlight>
        )}
        slots={{
          toggle: MenuButtonToggle,
        }}
      >
        <OverflowTooltip label={dropdownLabel}>
          {dropdownLabel}
        </OverflowTooltip>
      </SearchDropdown>
    </Box>
  );
};

export default App;
