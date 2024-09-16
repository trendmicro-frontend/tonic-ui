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
    focusOnLastItem,
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
  const handleClick = callEventHandlers(onClickProp, (event) => {
    // Don't handle `onClick` event when the `MenuToggle` is disabled
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (isOpen) {
      ensureFunction(closeMenu)();
      return;
    }

    ensureFunction(openMenu)();

    // If `autoSelect` is true, focus on the first item when the menu opens with a mouse click
    autoSelect && focusOnFirstItem();
  });
  const handleKeyDown = callEventHandlers(onKeyDownProp, event => {
    // Don't handle `onKeyDown` event when the `MenuToggle` is disabled
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (event.key === 'ArrowDown') {
      ensureFunction(openMenu)();

      // Focus on the first item when the menu opens with the down arrow
      ensureFunction(focusOnFirstItem)();
      return;
    }

    if (event.key === 'ArrowUp') {
      ensureFunction(openMenu)();

      // Focus on the last item when the menu opens with the up arrow
      ensureFunction(focusOnLastItem)();
      return;
    }
  });

  const getMenuToggleProps = () => ({
    'aria-controls': menuId,
    'aria-disabled': ariaAttr(disabled),
    'aria-expanded': ariaAttr(isOpen),
    'aria-haspopup': 'menu',
    disabled,
    id: menuToggleId,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
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
