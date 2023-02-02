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
} from '@tonic-ui/react';
import { noop } from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import React, { useCallback, useEffect, useState } from 'react';

const Multiselect = ({
  items = [],
  onChange: onChangeProp,
  renderItem = noop,
  renderLabel = noop,
  value: valueProp,
}) => {
  const [value, setValue] = useState(ensureArray(valueProp ?? []));

  useEffect(() => {
    const isControlled = valueProp !== undefined;
    if (isControlled) {
      setValue(valueProp);
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
        <CheckboxGroup
          size="sm"
          value={value}
          onChange={onCheckboxGroupChange}
        >
          <Box
            px="3x"
            mb="2x"
          >
            <LinkButton
              key="toggle"
              onClick={handleClickToggle}
            >
              {isAllSelected ? 'Clear all' : 'Select all'}
            </LinkButton>
          </Box>
          <Scrollbar
            maxHeight={250}
            overflowY="auto"
          >
            {items.map((x) => (
              <MenuItem
                key={x}
                onKeyDown={handleKeyDown}
              >
                <Checkbox
                  value={x}
                  width="100%" // Fill the entire width of the menu item to make it easier to click
                >
                  {renderItem(x)}
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
