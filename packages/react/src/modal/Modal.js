import { useOnceWhen } from '@tonic-ui/react-hooks';
import { getAllFocusable, runIfFn, warnDeprecatedProps } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock/dist/cjs';
import { Portal } from '../portal';
import { AnimatePresence } from '../utils/animate-presence';
import ModalContainer from './ModalContainer';
import { ModalProvider } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const defaultScrollBehavior = 'inside';
const defaultSize = 'auto';

const Modal = forwardRef((
  {
    isCloseButtonVisible, // deprecated
    autoFocus = false,
    children,
    closeOnEsc = false,
    closeOnOutsideClick = false,
    ensureFocus = false,
    finalFocusRef,
    initialFocusRef,
    isClosable = false,
    isOpen = false,
    onClose,
    portalProps,
    scrollBehavior = defaultScrollBehavior,
    size = defaultSize,
    ...rest
  },
  ref,
) => {
  { // deprecation warning
    const prefix = `${Modal.displayName}:`;

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
  const contentRef = useRef();
  const context = getMemoizedState({
    autoFocus,
    closeOnEsc,
    closeOnOutsideClick,
    ensureFocus,
    finalFocusRef,
    initialFocusRef,
    isClosable,
    isOpen,
    onClose,
    scrollBehavior,
    size,
    containerRef, // internal use only
    contentRef, // internal use only
    placement: 'center', // internal use only (only 'center' is supported by Modal)
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
    <ModalProvider value={context}>
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
              <ModalContainer
                ref={ref}
                {...rest}
              >
                {runIfFn(children, context)}
              </ModalContainer>
            </FocusLock>
          </Portal>
        )}
      </AnimatePresence>
    </ModalProvider>
  );
});

Modal.displayName = 'Modal';

export default Modal;
