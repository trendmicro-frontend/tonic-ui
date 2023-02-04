import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  LinkButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Scrollbar,
  SearchInput,
  useColorMode,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import { noop } from '@tonic-ui/utils';
import { ensureArray, ensureFunction, ensureString } from 'ensure-type';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Highlight from 'react-highlight-words';

const Multiselect = ({
  isSearchable = false,
  items = [],
  onChange: onChangeProp,
  renderItem = noop,
  renderLabel = noop,
  value: valueProp,
}) => {
  const searchInputRef = useRef();
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const { colors } = useTheme();
  const [value, setValue] = useState(ensureArray(valueProp));
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    const isControlled = valueProp !== undefined;
    if (isControlled) {
      setValue(ensureArray(valueProp));
    }
  }, [valueProp]);

  const onCheckboxGroupChange = useCallback((nextValue) => {
    setValue(nextValue);
  }, []);

  const isAllSelected = value.length === items.length;
  const isNoneSelected = value.length === 0;
  const handleClickToggle = (event) => {
    const nextValue = isAllSelected ? [] : items;
    setValue(nextValue);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      const el = event.currentTarget.querySelector('input');
      if (el) {
        const nextValue = [...value];
        nextValue.indexOf(el.value) === -1
          ? nextValue.push(el.value) // add
          : nextValue.splice(nextValue.indexOf(el.value), 1); // remove
        setValue(nextValue);
      }
    }
  }

  const normalizedSearchString = ensureString(searchString).trim().toLowerCase();
  const filteredItems = items.filter(item => {
    if (!normalizedSearchString) {
      return true;
    }
    const normalizedItemString = renderItem(item).trim().toLowerCase();
    return normalizedItemString.includes(normalizedSearchString);
  });

  return (
    <Menu
      closeOnSelect={false}
      onClose={() => {
        if (isNoneSelected) {
          // Automatically reset all the options when the menu loses focus
          setValue(items);
          ensureFunction(onChangeProp)(items);
        } else {
          ensureFunction(onChangeProp)(value);
        }
      }}
    >
      <MenuButton
        variant="secondary"
        width={200}
      >
        <Flex
          maxWidth={200 - 40}
        >
          {renderLabel(value)}
        </Flex>
      </MenuButton>
      <MenuList
        width="100%"
      >
        {isSearchable && (
          <Box
            px="3x"
            mb="2x"
          >
            <SearchInput
              inputProps={{
                role: 'menuitem', // Specify "menuitem" role for keyboard navigation
                onKeyDown: (event) => {
                  // Stop event propagation to menu for specific keys
                  const keys = ['Home', 'End', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
                  if (keys.includes(event.key)) {
                    event.stopPropagation();
                  }
                },
              }}
              ref={searchInputRef}
              value={searchString}
              onClearInput={(event) => {
                setSearchString('');
              }}
              onChange={(event) => {
                const value = event.target.value;
                setSearchString(value);
              }}
            />
          </Box>
        )}
        <CheckboxGroup
          size="sm"
          value={value}
          onChange={onCheckboxGroupChange}
        >
          {!normalizedSearchString && (
            <Box
              px="3x"
              mb="2x"
            >
              <LinkButton
                key="toggle"
                onClick={handleClickToggle}
              >
                {isAllSelected ? ('Clear all') : ('Select all')}
              </LinkButton>
            </Box>
          )}
          <Scrollbar
            maxHeight={250}
            overflowY="auto"
          >
            {filteredItems.map((x) => (
              <MenuItem
                key={x}
                onKeyDown={handleKeyDown}
              >
                <Checkbox
                  value={x}
                  width="100%" // Fill the entire width of the menu item to make it easier to click
                >
                  <Highlight
                    searchWords={[normalizedSearchString]}
                    textToHighlight={renderItem(x)}
                    highlightStyle={{
                      backgroundColor: colors[colorStyle.text.highlight],
                      color: colors['gray:100'],
                    }}
                  />
                </Checkbox>
              </MenuItem>
            ))}
          </Scrollbar>
        </CheckboxGroup>
      </MenuList>
    </Menu>
  );
};

export default Multiselect;
