import FocusLock from 'react-focus-lock/dist/cjs';
import memoize from 'micro-memoize';
import React, { useCallback, useRef } from 'react';
import Portal from '../Portal';
import useEffectOnce from '../hooks/useEffectOnce';
import config from '../shared/config';
import { useId } from '../utils/autoId';
import useNodeRef from '../utils/useNodeRef';
import getFocusableElements from '../utils/getFocusableElements';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import { ModalProvider } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const Modal = ({
  isCloseButtonVisible, // deprecated
  size = 'auto',
  isClosable = false,
  isOpen = false,
  closeOnEsc = false,
  closeOnOutsideClick = false,
  onClose,
  initialFocusRef,
  finalFocusRef,
  ensureFocus = false,
  autoFocus = false,
  id,
  children,
}) => {
  useEffectOnce(() => {
    if (isCloseButtonVisible !== undefined) {
      warnDeprecatedProps('isCloseButtonVisible', {
        alternative: 'isClosable',
        willRemove: true,
      });
    }
  });

  isClosable = isClosable || isCloseButtonVisible; // TODO: remove this line after deprecation
  const defaultId = useId();
  const contentRef = useRef(null);
  const modalState = getMemoizedState({
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

  id = id ?? defaultId;
  const portalId = `${config.name}:portal-${id}`;
  const mountRef = useNodeRef({
    isOpen,
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

  if (!isOpen) {
    return null;
  }

  return (
    <ModalProvider value={modalState}>
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
    </ModalProvider>
  );
};

Modal.displayName = 'Modal';

export default Modal;
