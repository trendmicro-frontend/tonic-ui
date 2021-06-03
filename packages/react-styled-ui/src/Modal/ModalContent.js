import chainedFunction from 'chained-function';
import React, { forwardRef } from 'react';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import Fade from '../Transitions/Fade';
import usePresence from '../usePresence';
import useForkRef from '../utils/useForkRef';
import {
  useModalContentStyle,
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
    isOpen,
    closeOnOutsideClick,
    onClose,
  } = { ...modalContext };
  const [, safeToRemove] = usePresence();
  const backdropStyleProps = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <TransitionComponent
      {...TransitionProps}
      in={isOpen}
      onExited={chainedFunction(safeToRemove, TransitionProps?.onExited)}
    >
      {(state, { ref, style: transitionStyle }) => (
        <Box
          ref={ref}
          onClick={event => {
            event.stopPropagation();
            if (closeOnOutsideClick) {
              (typeof onClose === 'function') && onClose(event);
            }
          }}
          {...backdropStyleProps}
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
    isCloseButtonVisible,
    onClose,
    size,

    // internal use only
    contentRef,
  } = { ...modalContext };
  const combinedRef = useForkRef(ref, contentRef);
  const contentStyleProps = useModalContentStyle({ size });

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
      {...contentStyleProps}
      {...rest}
    >
      {children}
      {!!isCloseButtonVisible && (
        <ModalCloseButton onClick={onClose} />
      )}
    </Box>
  );
});

const ModalContent = React.forwardRef(({
  children,
  zIndex = 'modal',
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
      zIndex={zIndex}
    >
      <ModalContentFront ref={ref} {...rest}>
        {children}
      </ModalContentFront>
    </ModalContentBackdrop>
  );
});

ModalContent.displayName = 'ModalContent';

export default ModalContent;
