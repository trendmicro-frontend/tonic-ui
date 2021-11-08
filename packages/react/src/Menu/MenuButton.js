import React, { forwardRef } from 'react';
import Button from '../Button';
import wrapEvent from '../utils/wrapEvent';
import useForkRef from '../utils/useForkRef';
import {
  useMenuButtonStyle,
} from './styles';
import useMenu from './useMenu';

const MenuButton = forwardRef((
  {
    onClick,
    onKeyDown,
    children,
    disabled,
    variant = 'default',
    ...rest
  },
  ref,
) => {
  const {
    isOpen,
    focusOnLastItem,
    focusOnFirstItem,
    closeMenu,
    menuId,
    buttonId,
    autoSelect,
    openMenu,
    buttonRef,
  } = useMenu();
  const menuButtonRef = useForkRef(buttonRef, ref);
  const styleProps = useMenuButtonStyle();

  return (
    <Button
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={menuId}
      data-active={isOpen}
      aria-disabled={disabled}
      disabled={disabled}
      id={buttonId}
      role="button"
      ref={menuButtonRef}
      onClick={wrapEvent(onClick, (event) => {
        if (isOpen) {
          closeMenu();
        } else if (autoSelect) {
          focusOnFirstItem();
        } else {
          event.preventDefault();
          !disabled && openMenu();
        }
      })}
      onKeyDown={wrapEvent(onKeyDown, event => {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          focusOnFirstItem();
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault();
          focusOnLastItem();
        }
      })}
      variant={variant}
      {...styleProps}
      {...rest}
    >
      {children}
    </Button>
  );
});

MenuButton.displayName = 'MenuButton';

export default MenuButton;
