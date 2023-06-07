import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@tonic-ui/react';
import { noop } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { useCallback, useEffect, useState } from 'react';

const Dropdown = ({
  items = [],
  onChange: onChangeProp,
  renderItem = noop,
  renderLabel = noop,
  value: valueProp,
  variant = 'secondary',
  width = 200,
}) => {
  const [value, setValue] = useState(valueProp ?? '');

  useEffect(() => {
    const isControlled = valueProp !== undefined;
    if (isControlled) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const onChange = useCallback(
    (nextValue) => {
      const isControlled = valueProp !== undefined;
      if (!isControlled) {
        setValue(nextValue);
      }
      ensureFunction(onChangeProp)(nextValue);
    },
    [onChangeProp, valueProp]
  );

  const handleClickMenuItemBy = (value) => (event) => {
    onChange(value);
  };

  const maxWidth = typeof width === 'number'
    ? `calc(${width}px - 48px)`
    : `calc(${width} - 48px)`;

  return (
    <Menu>
      <MenuButton
        variant={variant}
        width={width}
      >
        <Flex
          maxWidth={maxWidth}
        >
          {renderLabel(value)}
        </Flex>
      </MenuButton>
      <MenuList
        width="100%"
      >
        {items.map((x) => (
          <MenuItem
            key={x}
            onClick={handleClickMenuItemBy(x)}
          >
            {renderItem(x)}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Dropdown;
