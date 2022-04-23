import { Box } from '@tonic-ui/react';
import { ensureString } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import runIfFn from '../../utils/runIfFn';
import useAutoId from '../../utils/useAutoId';
import { MenuProvider } from './context';
import { useMenuStyle } from './styles';

const name = '@tonic-ui/react-lab';

const getMemoizedState = memoize(state => ({ ...state }));

const mapPlacementToDirection = (placement) => {
  const p0 = ensureString(placement).split('-')[0];
  const direction = {
    top: 'up',
    bottom: 'down',
  }[p0];

  return direction;
};

const Menu = forwardRef((
  {
    children,
    defaultIsOpen = false,
    isOpen: isOpenProp,
    offset,
    onBlur: onBlurProp,
    onClose: onCloseProp,
    onKeyDown: onKeyDownProp,
    onOpen: onOpenProp,
    placement = 'bottom-start', // One of: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'
    ...rest
  },
  ref,
) => {
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);
  const [isOpen, setIsOpen] = useState(isOpenProp ?? defaultIsOpen);

  useEffect(() => {
    const isControlled = (isOpenProp !== undefined);
    if (isControlled) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  const onOpen = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      setIsOpen(true);
    }

    if (typeof onOpenProp === 'function') {
      onOpenProp();
    }
  }, [isOpenProp, onOpenProp]);

  const onClose = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      setIsOpen(false);
    }

    if (typeof onCloseProp === 'function') {
      onCloseProp();
    }
  }, [isOpenProp, onCloseProp]);

  const defaultId = useAutoId();
  const menuId = `${name}:Menu-${defaultId}`;
  const menuToggleId = `${name}:MenuToggle-${defaultId}`;
  const direction = mapPlacementToDirection(placement);
  const context = getMemoizedState({
    direction,
    isOpen,
    offset,
    onBlur: onBlurProp,
    onClose,
    onKeyDown: onKeyDownProp,
    onOpen,
    placement,
    menuId,
    menuRef,
    menuToggleId,
    menuToggleRef,
  });
  const styleProps = useMenuStyle({});

  return (
    <MenuProvider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {runIfFn(children, context)}
      </Box>
    </MenuProvider>
  );
});

Menu.displayName = 'Menu';

export default Menu;
