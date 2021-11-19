import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import Box from '../Box';
import wrapEvent from '../utils/wrapEvent';
import { useMenuItemStyle } from './styles';
import useMenu from './useMenu';

const MenuItem = forwardRef((
  {
    disabled,
    onClick,
    onMouseLeave,
    onMouseEnter,
    onKeyDown,
    role = 'menuitem',
    ...props
  },
  ref,
) => {
  const menuContext = useMenu(); // context might be an undefined value
  const {
    closeOnSelect,
    closeMenu,
  } = { ...menuContext };
  const styleProps = useMenuItemStyle();

  return (
    <Box
      ref={ref}
      role={role}
      tabIndex={-1}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={wrapEvent(onClick, event => {
        if (disabled) {
          event.stopPropagation();
          event.preventDefault();
          return;
        }
        if (closeOnSelect) {
          ensureFunction(closeMenu)();
        }
      })}
      onKeyDown={wrapEvent(onKeyDown, event => {
        if (disabled) {
          return;
        }
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();

          if (onClick) {
            ensureFunction(onClick)();
          }

          if (closeOnSelect) {
            ensureFunction(closeMenu)();
          }
        }
      })}
      {...styleProps}
      {...props}
    />
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
