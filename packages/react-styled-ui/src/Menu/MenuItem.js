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
      focusableItems,
      focusAtIndex,
      closeOnSelect,
      closeMenu,
    } = useMenu();

    const styleProps = useMenuItemStyle();

    return (
      <PseudoBox
        as="li"
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
        onMouseEnter={wrapEvent(onMouseEnter, event => {
          if (disabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
          }
          if (focusableItems && focusableItems.current.length > 0) {
            let nextIndex = focusableItems.current.indexOf(event.currentTarget);
            focusAtIndex(nextIndex);
          }
        })}
        onMouseLeave={wrapEvent(onMouseLeave, () => {
          focusAtIndex(-1);
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
