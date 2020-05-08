import React, { useRef, useEffect, useCallback } from 'react';
import exenv from 'exenv';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import FocusLock from 'react-focus-lock/dist/cjs';
import { useId } from '../utils/autoId';
import getFocusables from '../utils/getFocusables';
import ColorModeProvider from '../ColorModeProvider';
import ThemeProvider from '../ThemeProvider';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';
import Portal from '../Portal';
import { ModalContext } from './context';
import ModalContent from './ModalContent';
import ModalOverlay from './ModalOverlay';

const { canUseDOM } = exenv;

const useHider = ({
  isOpen,
  id,
  container = canUseDOM ? document.body : null,
}) => {
  const mountRef = useRef(
    canUseDOM
      ? document.getElementById(id) || document.createElement('div')
      : null,
  );

  useEffect(() => {
    let mountNode = mountRef.current;

    if (isOpen && canUseDOM) {
      mountRef.current.id = id;
      container.appendChild(mountRef.current);
    }

    return () => {
      if (mountNode.parentElement) {
        mountNode.parentElement.removeChild(mountNode);
      }
    };
  }, [isOpen, id, container]);

  return mountRef;
};

const Modal = ({
  isOpen,
  initialFocusRef,
  finalFocusRef,
  onClose,
  blockScrollOnMount = true,
  closeOnEsc = false,
  closeOnOverlayClick = false,
  preserveScrollBarGap,
  formatIds = id => ({
    content: `modal-${id}`,
    header: `modal-${id}-header`,
    body: `modal-${id}-body`,
  }),
  container,
  returnFocusOnClose = true,
  children,
  id,
  size = 'md',
  disableOverlay = false,
  ...restProps
}) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const contentRef = useRef(null);
  const uuid = useId();
  const _id = id || uuid;

  const contentId = formatIds(_id).content;
  const headerId = formatIds(_id).header;
  const bodyId = formatIds(_id).body;
  const portalId = `trendmicro-react-styled-ui-portal-${_id}`;
  const mountedModalCount = canUseDOM ? document.querySelectorAll('[id^=trendmicro-react-styled-ui-portal-]').length : 0;

  useEffect(() => {
    const dialogNode = contentRef.current;
    if (isOpen && blockScrollOnMount) {
      disableBodyScroll(dialogNode, {
        reserveScrollBarGap: preserveScrollBarGap,
      });
    }
    return () => {
      return mountedModalCount === 0 ? enableBodyScroll(dialogNode) : {};
    };
  }, [isOpen, blockScrollOnMount, preserveScrollBarGap], mountedModalCount);

  const mountRef = useHider({
    isOpen,
    id: portalId,
    container,
  });

  const context = {
    isOpen,
    initialFocusRef,
    onClose,
    blockScrollOnMount,
    closeOnEsc,
    closeOnOverlayClick,
    returnFocusOnClose,
    contentRef,
    headerId,
    bodyId,
    contentId,
    size,
    disableOverlay,
  };

  const activateFocusLock = useCallback(() => {
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    } else if (contentRef.current) {
      let focusables = getFocusables(contentRef.current);
      if (focusables.length === 0) {
        contentRef.current.focus();
      }
    }
  }, [initialFocusRef]);

  const deactivateFocusLock = useCallback(() => {
    if (finalFocusRef && finalFocusRef.current) {
      finalFocusRef.current.focus();
    }
  }, [finalFocusRef]);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContext.Provider value={context}>
      <Portal container={mountRef.current}>
        <FocusLock
          returnFocus={returnFocusOnClose && !finalFocusRef}
          onActivation={activateFocusLock}
          onDeactivation={deactivateFocusLock}
        >
          <ThemeProvider theme={theme}>
            <ColorModeProvider value={colorMode}>
              <ModalOverlay />
              <ModalContent {...restProps}>
                {children}
              </ModalContent>
            </ColorModeProvider>
          </ThemeProvider>
        </FocusLock>
      </Portal>
    </ModalContext.Provider>
  );
};

Modal.displayName = 'Modal';

export default Modal;
