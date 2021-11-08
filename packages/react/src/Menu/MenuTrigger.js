import React, { forwardRef } from 'react';
import ButtonBase from '../ButtonBase';
import wrapEvent from '../utils/wrapEvent';
import useForkRef from '../utils/useForkRef';
import useMenu from './useMenu';

const MenuTrigger = forwardRef((
  {
    onClick,
    onKeyDown,
    children,
    disabled,
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

  return (
    <ButtonBase
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
      {...rest}
    >
      {children}
    </ButtonBase>
  );
});

MenuTrigger.displayName = 'MenuTrigger';

export default MenuTrigger;
