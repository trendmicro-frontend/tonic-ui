import { useOnceWhen } from '@tonic-ui/react-hooks';
import { getAllFocusable, runIfFn, warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock/dist/cjs';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import { Portal } from '../portal';
import { AnimatePresence } from '../utils/animate-presence';
import DrawerContainer from './DrawerContainer';
import { DrawerContext } from './context';

const defaultPlacement = 'right';
const defaultSize = 'auto';

const Drawer = forwardRef((inProps, ref) => {
  const {
    closeOnOutsideClick: closeOnOutsideClickProp, // deprecated

    autoFocus = false,
    backdrop = false,
    children,
    closeOnEsc = false,
    closeOnInteractOutside: closeOnInteractOutsideProp = false,
    ensureFocus = false,
    finalFocusRef,
    initialFocusRef,
    isClosable = false,
    isOpen = false,
    onClose,
    onInteractOutside,
    placement = defaultPlacement,
    portalProps,
    returnFocusOnClose = true,
    size = defaultSize,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Drawer' });
  const shallowMemo = useShallowMemo();

  { // deprecation warning
    const prefix = `${Drawer.displayName}:`;
    const isTargetEnvironment = ['development', 'test'].includes(process.env.NODE_ENV);

    useOnceWhen(() => {
      warnDeprecatedProps('closeOnOutsideClick', {
        prefix,
        alternative: 'closeOnInteractOutside',
        willRemove: true,
      });

      // TODO: Remove the target environment check in the next major release
    }, isTargetEnvironment && (closeOnOutsideClickProp !== undefined));
  }

  const closeOnInteractOutside = closeOnOutsideClickProp ?? closeOnInteractOutsideProp;

  const [isMounted, setIsMounted] = useState(isOpen);
  const containerRef = useRef();
  const contentRef = useRef(null);

  const context = shallowMemo({
    autoFocus,
    backdrop,
    closeOnEsc,
    closeOnInteractOutside,
    ensureFocus,
    finalFocusRef,
    initialFocusRef,
    isClosable,
    isOpen,
    onClose,
    onInteractOutside,
    placement,
    size,
    containerRef, // internal use only
    contentRef, // internal use only
    scrollBehavior: 'inside', // internal use only (only 'inside' is supported by Drawer)
  });

  const returnFocus = returnFocusOnClose && !finalFocusRef;
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
    setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen && !isMounted) {
      setIsMounted(true);
      return;
    }
  }, [isOpen, isMounted]);

  return (
    <DrawerContext.Provider value={context}>
      <AnimatePresence
        in={isOpen}
        onExitComplete={onExitComplete}
      >
        {!!isMounted && (
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
