import { runIfFn } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import config from '../shared/config';
import useAutoId from '../utils/useAutoId';
import { SubmenuContext } from './context';
import { useSubmenuStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const Submenu = forwardRef((inProps, ref) => {
  const {
    children,
    defaultIsOpen = false,
    isOpen: isOpenProp,
    offset,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    placement = 'right-start', // One of: 'right-start', 'right-end', 'left-start', 'left-end'
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Submenu' });
  const submenuContentRef = useRef(null);
  const submenuToggleRef = useRef(null);
  const isHoveringSubmenuContentRef = useRef();
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
    isHoveringSubmenuContentRef,
    isHoveringSubmenuToggleRef,
    isOpen,
    offset,
    onClose,
    onOpen,
    placement,
    submenuId,
    submenuToggleId,
    submenuContentRef,
    submenuToggleRef,
  });

  return (
    <SubmenuContext.Provider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {runIfFn(children, context)}
      </Box>
    </SubmenuContext.Provider>
  );
});

Submenu.displayName = 'Submenu';

export default Submenu;
