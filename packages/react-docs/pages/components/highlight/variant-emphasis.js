import {
  Box,
  Highlight,
  SearchInput,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  OverflowTooltip,
  Text,
} from '@tonic-ui/react';
import React, { useState } from 'react';

const fruits = [
  'Apple',
  'Apricot',
  'Avocado',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Cherry',
  'Coconut',
  'Cranberry',
  'Dragon Fruit',
  'Grape',
  'Grapefruit',
  'Guava',
  'Kiwi',
  'Lemon',
  'Lime',
  'Mango',
  'Melon',
  'Orange',
  'Papaya',
  'Peach',
  'Pear',
  'Pineapple',
  'Plum',
  'Raspberry',
  'Strawberry',
  'Watermelon',
];

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFruit, setSelectedFruit] = useState('');

  const filteredFruits = fruits.filter((fruit) =>
    fruit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (fruit) => {
    setSelectedFruit(fruit);
    setSearchQuery('');
  };

  const dropdownLabel = !selectedFruit
    ? 'Select a fruit'
    : `Selected fruit: ${selectedFruit}`;

  return (
    <Box>
      <Menu
        width={200}
      >
        <MenuButton
          variant="secondary"
          sx={{
            width: '100%',
            '> :first-of-type': {
              // Override flex item's default `minWidth: auto` to allow text truncation
              minWidth: 0,
            },
          }}
        >
          <OverflowTooltip label={dropdownLabel}>
            {dropdownLabel}
          </OverflowTooltip>
        </MenuButton>
        <MenuList
          PopperProps={{
            usePortal: false,
          }}
          sx={{
            // Set the minimum width to fit the menu's content while occupying full width
            minWidth: 'max-content',
            width: '100%',
            maxHeight: 240,
            overflow: 'auto',
          }}
        >
          <Box px="3x" mb="2x">
            <SearchInput
              placeholder="Search fruits..."
              value={searchQuery}
              onClearInput={(event) => {
                setSearchQuery('');
              }}
              onChange={(event) => {
                const value = event.target.value;
                setSearchQuery(value);
              }}
            />
          </Box>
          {filteredFruits.length > 0 ? (
            filteredFruits.map((fruit) => (
              <MenuItem
                key={fruit}
                onClick={() => handleSelect(fruit)}
              >
                <Highlight variant="emphasis" query={searchQuery}>
                  {fruit}
                </Highlight>
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>
              <Text color="gray:50">No results found</Text>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default App;
