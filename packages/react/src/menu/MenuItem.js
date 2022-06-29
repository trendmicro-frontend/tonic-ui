import {
  callEventHandlers,
} from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useMenuItemStyle } from './styles';
import useMenu from './useMenu';

const MenuItem = forwardRef((
  {
    disabled,
    onClick,
    onKeyDown,
    role = 'menuitem',
    ...rest
  },
  ref,
) => {
  const menuContext = useMenu(); // context might be an undefined value
  const {
    closeOnSelect,
    onClose: closeMenu,
  } = { ...menuContext };
  const styleProps = useMenuItemStyle();

  return (
    <Box
      ref={ref}
      role={role}
      tabIndex={-1}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={callEventHandlers(onClick, event => {
        if (disabled) {
          event.stopPropagation();
          event.preventDefault();
          return;
        }
        if (closeOnSelect) {
          ensureFunction(closeMenu)();
        }
      })}
      onKeyDown={callEventHandlers(onKeyDown, event => {
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
      {...rest}
    />
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
