import chainedFunction from 'chained-function';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Box } from '../box';
import { ButtonBase } from '../button';
import { Icon } from '../icon';
import { usePresence } from '../presence';
import { Fade } from '../transitions';
import noop from '../utils/noop';
import useForkRef from '../utils/useForkRef';
import {
  useModalContentStyle,
  useModalContentBackdropStyle,
  useModalCloseButtonStyle,
} from './styles';
import useModal from './useModal';

const ModalCloseButton = (props) => {
  const closeButtonStyleProps = useModalCloseButtonStyle();

  return (
    <ButtonBase {...closeButtonStyleProps} {...props}>
      <Icon icon="close" />
    </ButtonBase>
  );
};

const ModalContentBackdrop = forwardRef(({
  TransitionComponent,
  TransitionProps,
  ...rest
}, ref) => {
  const modalContext = useModal(); // context might be an undefined value
  const {
    closeOnOutsideClick,
    isOpen,
    onClose,
    scrollBehavior,
  } = { ...modalContext };
  const nodeRef = useRef();
  const combinedRef = useForkRef(nodeRef, ref);
  const [, safeToRemove] = usePresence();
  const styleProps = useModalContentBackdropStyle({ scrollBehavior });

  useEffect(() => {
    if (scrollBehavior === 'outside') {
      // When the scroll behavior is set to `outside`, we have to detect whether the content overflows the viewport.
      // * If it does overflow, set `alignItems` to `flex-start` to make the content scrollable from the top.
      // * If it doesn't overflow, remove the `alignItems` CSS property to vertically align the content to its original position (e.g. `center`).
      const viewport = window?.visualViewport;
      const updateVerticalAlignment = () => {
        const el = nodeRef?.current;
        if (!el) {
          return;
        }
        if (el.scrollHeight > viewport?.height) {
          el.style.alignItems = 'flex-start';
        } else {
          el.style.alignItems = '';
        }
      };
      updateVerticalAlignment();
      viewport?.addEventListener?.('resize', updateVerticalAlignment);
      return () => {
        viewport?.removeEventListener?.('resize', updateVerticalAlignment);
      };
    }

    return noop;
  }, [scrollBehavior]);

  return (
    <TransitionComponent
      appear={true}
      {...TransitionProps}
      in={isOpen}
      onExited={chainedFunction(safeToRemove, TransitionProps?.onExited)}
    >
      {(state, { ref, style: transitionStyle }) => (
        <Box
          ref={combinedRef}
          onClick={event => {
            event.stopPropagation();
            if (closeOnOutsideClick) {
              (typeof onClose === 'function') && onClose(event);
            }
          }}
          {...styleProps}
          {...transitionStyle}
          {...rest}
        />
      )}
    </TransitionComponent>
  );
});

const ModalContentFront = forwardRef(({ children, ...rest }, ref) => {
  const modalContext = useModal(); // context might be an undefined value
  const {
    closeOnEsc,
    isClosable,
    onClose,
    scrollBehavior,
    size,

    // internal use only
    contentRef,
  } = { ...modalContext };
  const combinedRef = useForkRef(contentRef, ref);
  const styleProps = useModalContentStyle({ scrollBehavior, size });

  return (
    <Box
      ref={combinedRef}
      role="dialog"
      tabIndex={-1}
      outline={0}
      position="relative"
      width="100%"
      onClick={event => event.stopPropagation()}
      onKeyDown={event => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          if (closeOnEsc) {
            (typeof onClose === 'function') && onClose(event);
          }
        }
      }}
      {...styleProps}
      {...rest}
    >
      {children}
      {!!isClosable && (
        <ModalCloseButton onClick={onClose} />
      )}
    </Box>
  );
});

const ModalContent = React.forwardRef(({
  children,
  TransitionComponent = Fade,
  TransitionProps,
  ...rest
}, ref) => {
  const modalContext = useModal(); // context might be an undefined value

  if (!modalContext) {
    return (
      <ModalContentFront ref={ref} {...rest}>
        {children}
      </ModalContentFront>
    );
  }

  return (
    <ModalContentBackdrop
      TransitionComponent={TransitionComponent}
      TransitionProps={TransitionProps}
    >
      <ModalContentFront ref={ref} {...rest}>
        {children}
      </ModalContentFront>
    </ModalContentBackdrop>
  );
});

ModalContent.displayName = 'ModalContent';

export default ModalContent;
