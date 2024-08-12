import {
  Menu,
  MenuItem,
  MenuList,
  MenuToggle,
} from '@tonic-ui/react';
import { noop, runIfFn } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';

const Dropdown = forwardRef((
  {
    children,
    highlightSelectedOption = false,
    options = [],
    onChange: onChangeProp,
    renderOption = noop,
    value: valueProp,
    ...rest
  },
  ref,
) => {
  const [value, setValue] = useState(valueProp ?? '');

  useEffect(() => {
    const isControlled = valueProp !== undefined;
    if (isControlled) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const onChange = useCallback((nextValue) => {
    const isControlled = valueProp !== undefined;
    if (!isControlled) {
      setValue(nextValue);
    }
    ensureFunction(onChangeProp)(nextValue);
  }, [valueProp, onChangeProp]);

  const handleClickMenuItemBy = (value) => (event) => {
    onChange(value);
  };

  return (
    <Menu
      ref={ref}
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
        {options.map((option) => {
          const key = option;
          const isSelected = (value === option);

          return (
            <MenuItem
              data-selected={highlightSelectedOption ? isSelected : undefined}
              key={key}
              onClick={handleClickMenuItemBy(option)}
            >
              {renderOption(option)}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
