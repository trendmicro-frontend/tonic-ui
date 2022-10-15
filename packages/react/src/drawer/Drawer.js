import { useOnceWhen } from '@tonic-ui/react-hooks';
import { getAllFocusable, runIfFn, warnDeprecatedProps } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock/dist/cjs';
import { Portal } from '../portal';
import { AnimatePresence } from '../utils/animate-presence';
import DrawerContainer from './DrawerContainer';
import { DrawerContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const defaultPlacement = 'right';
const defaultSize = 'auto';

const Drawer = forwardRef((
  {
    isCloseButtonVisible, // deprecated
    autoFocus = false,
    backdrop = false,
    children,
    closeOnEsc = false,
    closeOnOutsideClick = false,
    ensureFocus = false,
    finalFocusRef,
    initialFocusRef,
    isClosable = false,
    isOpen = false,
    onClose,
    placement = defaultPlacement,
    portalProps,
    size = defaultSize,
    ...rest
  },
  ref,
) => {
  { // deprecation warning
    const prefix = `${Drawer.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('isCloseButtonVisible', {
        prefix,
        alternative: 'isClosable',
        willRemove: true,
      });
    }, (isCloseButtonVisible !== undefined));

    isClosable = isClosable || isCloseButtonVisible; // TODO: remove this line after deprecation
  }

  const [isMounted, setMounted] = useState(isOpen);
  const containerRef = useRef();
  const contentRef = useRef(null);
  const context = getMemoizedState({
    autoFocus,
    backdrop,
    closeOnEsc,
    closeOnOutsideClick,
    ensureFocus,
    finalFocusRef,
    initialFocusRef,
    isClosable,
    isOpen,
    onClose,
    placement,
    size,
    containerRef, // internal use only
    contentRef, // internal use only
    scrollBehavior: 'inside', // internal use only (only 'inside' is supported by Drawer)
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
      const focusableElements = getAllFocusable(el);
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
    <DrawerContext.Provider value={context}>
      <AnimatePresence
        in={isOpen}
        onExitComplete={onExitComplete}
      >
        {isMounted && (
          <Portal
            {...portalProps}
          >
            <FocusLock
              disabled={!ensureFocus}
              autoFocus={autoFocus}
              returnFocus={returnFocus}
              onActivation={onFocusLockActivation}
              onDeactivation={onFocusLockDeactivation}
            >
              <DrawerContainer
                ref={ref}
                {...rest}
              >
                {runIfFn(children, context)}
              </DrawerContainer>
            </FocusLock>
          </Portal>
        )}
      </AnimatePresence>
    </DrawerContext.Provider>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;
