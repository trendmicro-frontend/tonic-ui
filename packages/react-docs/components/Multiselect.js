import {
  Box,
  Checkbox,
  CheckboxGroup,
  LinkButton,
  Menu,
  MenuItem,
  MenuList,
  MenuToggle,
  Scrollbar,
  SearchInput,
  useColorMode,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import { noop, runIfFn } from '@tonic-ui/utils';
import { ensureArray, ensureFunction, ensureString } from 'ensure-type';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import Highlight from 'react-highlight-words';

const Multiselect = forwardRef((
  {
    children,
    highlightSelectedOption = false,
    isSearchable = false,
    options = [],
    onChange: onChangeProp,
    renderOption = noop,
    shouldSelectAllIfNoneSelected = false,
    value: valueProp,
    ...rest
  },
  ref,
) => {
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

  const isAllSelected = value.length === options.length;
  const isNoneSelected = value.length === 0;
  const handleClickToggle = (event) => {
    const nextValue = isAllSelected ? [] : options;
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
  const filteredOptions = options.filter(option => {
    if (!normalizedSearchString) {
      return true;
    }
    const normalizedItemString = renderOption(option).trim().toLowerCase();
    return normalizedItemString.includes(normalizedSearchString);
  });

  return (
    <Menu
      ref={ref}
      closeOnSelect={false}
      defaultActiveIndex={0}
      onClose={() => {
        if (isNoneSelected && shouldSelectAllIfNoneSelected) {
          // Automatically reset all the options when the menu loses focus
          setValue(options);
          ensureFunction(onChangeProp)(options);
        } else {
          ensureFunction(onChangeProp)(value);
        }
      }}
      {...rest}
    >
      <MenuToggle>
        {({ getMenuToggleProps }) => {
          return runIfFn(children, { getToggleProps: getMenuToggleProps });
        }}
      </MenuToggle>
      <MenuList
        width="max-content"
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
                  const input = event.target;
                  const {
                    selectionStart, // the position where the character will be inserted
                    selectionEnd, // if has a selection this value will be different than the previous
                    value, // this is the value before the key is added
                  } = input;
                  const isAtStart = (selectionStart === 0 && selectionEnd === 0);
                  const isAtEnd = (selectionStart === value.length && selectionEnd === value.length);

                  if (isAtStart && ['ArrowUp', 'Home'].includes(event.key)) {
                    return;
                  }
                  if (isAtEnd && ['ArrowDown', 'End'].includes(event.key)) {
                    return;
                  }

                  // Stop event propagation to menu for specific keys
                  event.stopPropagation();
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
            {filteredOptions.map((option) => {
              const key = option;
              const isSelected = value.includes(option);

              return (
                <MenuItem
                  data-selected={highlightSelectedOption ? isSelected : undefined}
                  key={key}
                  onKeyDown={handleKeyDown}
                >
                  <Checkbox
                    value={option}
                    width="100%" // Fill the entire width of the menu item to make it easier to click
                  >
                    <Highlight
                      searchWords={[normalizedSearchString]}
                      textToHighlight={renderOption(option)}
                      highlightStyle={{
                        backgroundColor: colors[colorStyle.text.highlight],
                        color: colors['gray:100'],
                      }}
                    />
                  </Checkbox>
                </MenuItem>
              );
            })}
          </Scrollbar>
        </CheckboxGroup>
      </MenuList>
    </Menu>
  );
});

Multiselect.displayName = 'Multiselect';

export default Multiselect;
