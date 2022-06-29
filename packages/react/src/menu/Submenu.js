import { runIfFn } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../box';
import config from '../shared/config';
import useAutoId from '../utils/useAutoId';
import { SubmenuProvider } from './context';
import { useSubmenuStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const Submenu = forwardRef((
  {
    children,
    defaultIsOpen = false,
    isOpen: isOpenProp,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    placement = 'right-start', // One of: 'right-start', 'right-end', 'left-start', 'left-end'
    ...rest
  },
  ref,
) => {
  const submenuRef = useRef(null);
  const submenuToggleRef = useRef(null);
  const isHoveringSubmenuListRef = useRef();
  const isHoveringSubmenuToggleRef = useRef();
  const [isOpen, setIsOpen] = useState(isOpenProp ?? defaultIsOpen);

  useEffect(() => {
    const isControlled = (isOpenProp !== undefined);
    if (isControlled) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  const onClose = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      setIsOpen(false);
    }

    if (typeof onCloseProp === 'function') {
      onCloseProp();
    }
  }, [isOpenProp, onCloseProp]);

  const onOpen = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      setIsOpen(true);
    }

    if (typeof onOpenProp === 'function') {
      onOpenProp();
    }
  }, [isOpenProp, onOpenProp]);

  const defaultId = useAutoId();
  const submenuId = `${config.name}:Submenu-${defaultId}`;
  const submenuToggleId = `${config.name}:SubmenuToggle-${defaultId}`;
  const styleProps = useSubmenuStyle();

  const context = getMemoizedState({
    isHoveringSubmenuListRef,
    isHoveringSubmenuToggleRef,
    isOpen,
    onClose,
    onOpen,
    placement,
    submenuId,
    submenuRef,
    submenuToggleId,
    submenuToggleRef,
  });

  return (
    <SubmenuProvider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {runIfFn(children, context)}
      </Box>
    </SubmenuProvider>
  );
});

Submenu.displayName = 'Submenu';

export default Submenu;
