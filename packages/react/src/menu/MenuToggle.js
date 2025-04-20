import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import {
  useMenuToggleStyle,
} from './styles';
import useMenu from './useMenu';

const MenuToggle = forwardRef((inProps, ref) => {
  const {
    children,
    disabled,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'MenuToggle' });
  const menuContext = useMenu(); // context might be an undefined value
  const {
    autoSelect,
    focusOnFirstItem,
    isOpen,
    menuId,
    menuToggleId,
    menuToggleRef,
    onClose: closeMenu,
    onOpen: openMenu,
  } = { ...menuContext };
  const combinedRef = useMergeRefs(menuToggleRef, ref);
  const styleProps = useMenuToggleStyle();
  const onClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (isOpen) {
      ensureFunction(closeMenu)();
    } else {
      ensureFunction(openMenu)();

      // If `autoSelect` is true, focus on the first item when the menu opens with a mouse click
      autoSelect && focusOnFirstItem();
    }
  };
  const onKeyDown = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent default scrolling for Space

      if (isOpen) {
        ensureFunction(closeMenu)();
      } else {
        ensureFunction(openMenu)();

        // If `autoSelect` is true, focus on the first item when the menu opens with a mouse click
        autoSelect && focusOnFirstItem();
      }
      return;
    }
  };

  const getMenuToggleProps = () => ({
    'aria-controls': menuId,
    'aria-disabled': ariaAttr(disabled),
    'aria-expanded': ariaAttr(isOpen),
    'aria-haspopup': 'menu',
    disabled,
    id: menuToggleId,
    onClick: callEventHandlers(onClickProp, onClick),
    onKeyDown: callEventHandlers(onKeyDownProp, onKeyDown),
    ref: combinedRef,
    role: 'button',
    tabIndex: 0,
    ...styleProps,
    ...rest,
  });

  if (typeof children === 'function') {
    return children({
      getMenuToggleProps,
    });
  }

  return (
    <ButtonBase {...getMenuToggleProps()}>
      {children}
    </ButtonBase>
  );
});

MenuToggle.displayName = 'MenuToggle';

export default MenuToggle;
