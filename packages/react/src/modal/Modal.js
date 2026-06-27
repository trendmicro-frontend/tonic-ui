import { useOnceWhen } from '@tonic-ui/react-hooks';
import { getAllFocusable, runIfFn, warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock/dist/cjs';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import { Portal } from '../portal';
import { AnimatePresence } from '../utils/animate-presence';
import ModalContainer from './ModalContainer';
import { ModalContext } from './context';

const defaultScrollBehavior = 'inside';
const defaultSize = 'auto';

/**
 * @typedef {Object} ModalProps
 * @property {boolean} [autoFocus=false] - The modal will automatically set focus on the first focusable element inside the modal when it is opened. ⚠️ This only works if `initialFocusRef` is not defined and `ensureFocus` is set to `true`.
 * @property {React.ReactNode | ((context: { autoFocus: boolean; closeOnEsc: boolean; closeOnInteractOutside: boolean; ensureFocus: boolean; finalFocusRef?: React.RefObject<HTMLElement>; initialFocusRef?: React.RefObject<HTMLElement>; isClosable: boolean; isOpen: boolean; onClose?: () => void; onInteractOutside?: (event: Event) => void; scrollBehavior: 'inside' | 'outside'; size: 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' }) => React.ReactNode)} [children] - A function child can be used intead of a React element. This function is called with the context object.
 * @property {boolean} [closeOnEsc=false] - Closes the modal when the `Escape` key is pressed.
 * @property {boolean} [closeOnInteractOutside=false] - Closes the modal when interacting outside the modal content.
 * @property {boolean} [ensureFocus=false] - Ensures that the user's focus remains within the modal when it is open, preventing them from interacting with elements outside the modal.
 * @property {React.RefObject<HTMLElement>} [finalFocusRef] - The `ref` of the element that should receive focus when the modal closes. ⚠️ This only works if `ensureFocus` is set to `true`.
 * @property {React.RefObject<HTMLElement>} [initialFocusRef] - The `ref` of the element that should receive focus when the modal opens. ⚠️ This only works if `ensureFocus` is set to `true`.
 * @property {boolean} [isClosable=false] - A close button will appear on the right side.
 * @property {boolean} [isOpen=false] - The modal is shown.
 * @property {() => void} [onClose] - Callback fired when the modal closes.
 * @property {(event: Event) => void} [onInteractOutside] - Callback fired when interacting outside the modal content. Call `event.preventDefault()` to prevent the modal from closing.
 * @property {boolean} [returnFocusOnClose=true] - The focus will be restored to the element that was focused on when the modal was initially opened. ⚠️ This only works if `ensureFocus` is set to `true`.
 * @property {'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'} [size='auto'] - Change the size of the modal.
 * @property {'inside' | 'outside'} [scrollBehavior='inside'] - Control the scroll behavior of the modal if the content overflows.
 * @property {{ containerRef?: React.RefObject<HTMLElement>; appendToParentPortal?: boolean }} [portalProps] - Props to be passed to the Portal component.
 */

/**
 * @type {ForwardRefComponent<'div', ModalProps>}
 */
const Modal = forwardRef((inProps, ref) => {
  const {
    closeOnOutsideClick: closeOnOutsideClickProp, // deprecated

    autoFocus = false,
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
    portalProps,
    returnFocusOnClose = true,
    scrollBehavior = defaultScrollBehavior,
    size = defaultSize,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Modal' });
  const shallowMemo = useShallowMemo();

  { // deprecation warning
    const prefix = `${Modal.displayName}:`;
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
  const contentRef = useRef();

  const context = shallowMemo({
    autoFocus,
    closeOnEsc,
    closeOnInteractOutside,
    ensureFocus,
    finalFocusRef,
    initialFocusRef,
    isClosable,
    isOpen,
    onClose,
    onInteractOutside,
    scrollBehavior,
    size,
    containerRef, // internal use only
    contentRef, // internal use only
    placement: 'center', // internal use only (only 'center' is supported by Modal)
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
    <ModalContext.Provider value={context}>
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
    </ModalContext.Provider>
  );
});

Modal.displayName = 'Modal';

export default Modal;
