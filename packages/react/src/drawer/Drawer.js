import { useOnceWhen } from '@tonic-ui/react-hooks';
import { getAllFocusable, runIfFn, warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock/dist/cjs';
import { useDefaultProps } from '../default-props';
import { Portal } from '../portal';
import { AnimatePresence } from '../utils/animate-presence';
import useShallowMemo from '../utils/useShallowMemo';
import DrawerContainer from './DrawerContainer';
import { DrawerContext } from './context';

const defaultPlacement = 'right';
const defaultSize = 'auto';

/**
 * @typedef {Object} DrawerProps
 * @property {boolean} [autoFocus=false] - The drawer will automatically set focus on the first focusable element inside the drawer when it is opened. ⚠️ This only works if `initialFocusRef` is not defined and `ensureFocus` is set to `true`.
 * @property {boolean} [backdrop=false] - A backdrop will be created for `DrawerOverlay` to function correctly. Otherwise, it will not expand to the entire screen.
 * @property {React.ReactNode | ((context: { autoFocus: boolean; backdrop: boolean; closeOnEsc: boolean; closeOnInteractOutside: boolean; ensureFocus: boolean; finalFocusRef?: React.RefObject<HTMLElement>; initialFocusRef?: React.RefObject<HTMLElement>; isClosable: boolean; isOpen: boolean; onClose?: () => void; onInteractOutside?: (event: Event) => void; placement: 'left' | 'right' | 'top' | 'bottom'; size: 'auto' | 'sm' | 'md' | 'lg' | 'full' }) => React.ReactNode)} [children] - A function child can be used intead of a React element. This function is called with the context object.
 * @property {boolean} [closeOnEsc=false] - Closes the drawer when the `Escape` key is pressed.
 * @property {boolean} [closeOnInteractOutside=false] - Closes the drawer when interacting outside the drawer content.
 * @property {boolean} [ensureFocus=false] - Ensures that the user's focus remains within the drawer when it is open, preventing them from interacting with elements outside the drawer.
 * @property {React.RefObject<HTMLElement>} [finalFocusRef] - The `ref` of the element that should receive focus when the drawer closes. ⚠️ This only works if `ensureFocus` is set to `true`.
 * @property {React.RefObject<HTMLElement>} [initialFocusRef] - The `ref` of the element that should receive focus when the drawer opens. ⚠️ This only works if `ensureFocus` is set to `true`.
 * @property {boolean} [isClosable=false] - A close button will appear on the right side.
 * @property {boolean} [isOpen=false] - The drawer is shown.
 * @property {() => void} [onClose] - Callback fired when the drawer closes.
 * @property {(event: Event) => void} [onInteractOutside] - Callback fired when interacting outside the drawer content. Call `event.preventDefault()` to prevent the drawer from closing.
 * @property {boolean} [returnFocusOnClose=true] - The focus will be restored to the element that was focused on when the drawer was initially opened. ⚠️ This only works if `ensureFocus` is set to `true`.
 * @property {'left' | 'right' | 'top' | 'bottom'} [placement='right'] - Change the placement of the drawer.
 * @property {'auto' | 'sm' | 'md' | 'lg' | 'full'} [size='auto'] - Change the size of the drawer.
 * @property {{ containerRef?: React.RefObject<HTMLElement>; appendToParentPortal?: boolean }} [portalProps] - Props to be passed to the Portal component.
 */

/**
 * @type {ForwardRefComponent<'div', DrawerProps>}
 */
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
