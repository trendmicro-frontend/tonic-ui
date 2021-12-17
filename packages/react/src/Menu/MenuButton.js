import React, { forwardRef } from 'react';
import Button from '../Button';
import MenuTrigger from './MenuTrigger';

const MenuButton = forwardRef((
  {
    onClick,
    onKeyDown,
    children,
    disabled,
    ...rest
  },
  ref,
) => {
  return (
    <MenuTrigger
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {({ getMenuTriggerProps }) => {
        return (
          <Button
            {...getMenuTriggerProps()}
            {...rest}
          >
            {children}
          </Button>
        );
      }}
    </MenuTrigger>
  );
});

MenuButton.displayName = 'MenuButton';

export default MenuButton;
