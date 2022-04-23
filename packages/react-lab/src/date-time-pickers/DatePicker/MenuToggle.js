import { Box } from '@tonic-ui/react';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useCallback } from 'react';
import wrapEvent from '../../utils/wrapEvent';
import useForkRef from '../../utils/useForkRef';
import {
  useMenuToggleStyle,
} from './styles';
import useMenu from './useMenu';

const MenuToggle = forwardRef((
  {
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    children,
    disabled,
    ...rest
  },
  ref,
) => {
  const menuContext = useMenu(); // context might be an undefined value
  const {
    isOpen,
    menuId,
    menuToggleId,
    menuToggleRef,
    onClose,
    onOpen,
  } = { ...menuContext };
  const styleProps = useMenuToggleStyle();
  const combinedRef = useForkRef(menuToggleRef, ref);
  const handleClick = wrapEvent(onClickProp, useCallback((event) => {
    // Don't handle `onClick` event when the `MenuToggle` is disabled
    if (disabled) {
      event.preventDefault();
      return;
    }

    !isOpen && ensureFunction(onOpen)();
  }, [disabled, isOpen, onOpen]));

  const handleKeyDown = wrapEvent(onKeyDownProp, useCallback((event) => {
    // Don't handle `onKeyDown` event when the `MenuToggle` is disabled
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (event.key === 'Escape') {
      isOpen && ensureFunction(onClose)();
      return;
    }
  }, [disabled, isOpen, onClose]));

  const getMenuToggleProps = () => ({
    'aria-controls': menuId,
    'aria-disabled': disabled,
    'aria-expanded': isOpen,
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
    <Box {...getMenuToggleProps()}>
      {children}
    </Box>
  );
});

MenuToggle.displayName = 'MenuToggle';

export default MenuToggle;
