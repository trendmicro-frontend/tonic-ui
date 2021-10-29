import React, { forwardRef } from 'react';
import { useMenu } from './context';
import { useMenuItemStyle } from './styles';
import PseudoBox from '../PseudoBox';
import wrapEvent from '../utils/wrapEvent';

const MenuItem = forwardRef(
  (
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
    const {
      closeOnSelect,
      closeMenu,
    } = useMenu();

    const styleProps = useMenuItemStyle();

    return (
      <PseudoBox
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
            closeMenu();
          }
        })}
        onKeyDown={wrapEvent(onKeyDown, event => {
          if (disabled) {
            return;
          }
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();

            if (onClick) {
              onClick();
            }

            if (closeOnSelect) {
              closeMenu();
            }
          }
        })}
        {...styleProps}
        {...props}
      />
    );
  },
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
