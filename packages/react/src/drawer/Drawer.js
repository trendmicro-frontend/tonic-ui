import { useEffectOnce } from '@tonic-ui/react-hooks';
import FocusLock from 'react-focus-lock/dist/cjs';
import memoize from 'micro-memoize';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Portal } from '../portal';
import { Presence } from '../presence';
import config from '../shared/config';
import useAutoId from '../utils/useAutoId';
import useNodeRef from '../utils/useNodeRef';
import getFocusableElements from '../utils/getFocusableElements';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import { DrawerProvider } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const Drawer = ({
  isCloseButtonVisible, // deprecated
  isClosable = false,
  backdrop,
  closeOnEsc = false,
  closeOnOutsideClick = false,
  placement = 'left',
  size = 'auto',
  isOpen = false,
  onClose,
  initialFocusRef,
  finalFocusRef,
  ensureFocus = false,
  autoFocus = false,
  children,
}) => {
  useEffectOnce(() => {
    const prefix = `${Drawer.displayName}:`;

    if (isCloseButtonVisible !== undefined) {
      warnDeprecatedProps('isCloseButtonVisible', {
        prefix,
        alternative: 'isClosable',
        willRemove: true,
      });
    }
  }, true); // TODO: check if `when` is true for each prop

  isClosable = isClosable || isCloseButtonVisible; // TODO: remove this line after deprecation
  const [isMounted, setMounted] = useState(isOpen);
  const defaultId = useAutoId();
  const contentRef = useRef(null);
  const drawerState = getMemoizedState({
    backdrop,
    placement,
    size,
    isOpen,
    isClosable,
    closeOnEsc,
    closeOnOutsideClick,
    onClose,
    initialFocusRef,
    finalFocusRef,
    autoFocus,

    // internal use only
    contentRef,
  });

  const portalId = `${config.name}:Drawer-${defaultId}`;
  const mountRef = useNodeRef({
    isOpen: isMounted,
    id: portalId,
  });

  const returnFocus = !finalFocusRef;
  const onFocusLockActivation = useCallback(() => {
    if (initialFocusRef && initialFocusRef.current) {
      const el = initialFocusRef.current;
      if (typeof el.focus === 'function') {
        el.focus();
      }
      return;
    }

    if (contentRef.current) {
      const el = contentRef.current;
      const focusableElements = getFocusableElements(el);
      if (focusableElements.length > 0) {
        return;
      }

      if (typeof el.focus === 'function') {
        el.focus();
      }
    }
  }, [initialFocusRef]);
  const onFocusLockDeactivation = useCallback(() => {
    if (finalFocusRef && finalFocusRef.current) {
      const el = finalFocusRef.current;
      if (typeof el.focus === 'function') {
        el.focus();
      }
    }
  }, [finalFocusRef]);
  const onExitComplete = useCallback(() => {
    setMounted(false);
  }, [setMounted]);

  useEffect(() => {
    if (isOpen && !isMounted) {
      setMounted(true);
      return;
    }
  }, [isOpen, isMounted]);

  return (
    <DrawerProvider value={drawerState}>
      <Presence
        isPresent={isOpen}
        onExitComplete={onExitComplete}
      >
        {isMounted && (
          <Portal container={mountRef.current}>
            <FocusLock
              disabled={!ensureFocus}
              autoFocus={autoFocus}
              returnFocus={returnFocus}
              onActivation={onFocusLockActivation}
              onDeactivation={onFocusLockDeactivation}
            >
              {children}
            </FocusLock>
          </Portal>
        )}
      </Presence>
    </DrawerProvider>
  );
};

Drawer.displayName = 'Drawer';

export default Drawer;
