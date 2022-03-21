import { useOnceWhen } from '@tonic-ui/react-hooks';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock/dist/cjs';
import { Portal } from '../portal';
import { Fade } from '../transitions';
import { AnimatePresence } from '../utils/animate-presence';
import config from '../shared/config';
import useAutoId from '../utils/useAutoId';
import useNodeRef from '../utils/useNodeRef';
import getFocusableElements from '../utils/getFocusableElements';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import ModalContainer from './ModalContainer';
import { ModalProvider } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const defaultScrollBehavior = 'inside';
const defaultSize = 'auto';

const Modal = forwardRef((
  {
    TransitionComponent = Fade,
    TransitionProps,
    isCloseButtonVisible, // deprecated
    autoFocus = false,
    closeOnEsc = false,
    closeOnOutsideClick = false,
    ensureFocus = false,
    finalFocusRef,
    initialFocusRef,
    isClosable = false,
    isOpen = false,
    onClose,
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
  const defaultId = useAutoId();
  const containerRef = useRef();
  const contentRef = useRef();
  const modalState = getMemoizedState({
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
  });

  const portalId = `${config.name}:Modal-${defaultId}`;
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
    <ModalProvider value={modalState}>
      <AnimatePresence
        in={isOpen}
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
              <ModalContainer
                ref={ref}
                TransitionComponent={TransitionComponent}
                TransitionProps={TransitionProps}
                {...rest}
              />
            </FocusLock>
          </Portal>
        )}
      </AnimatePresence>
    </ModalProvider>
  );
});

Modal.displayName = 'Modal';

export default Modal;
