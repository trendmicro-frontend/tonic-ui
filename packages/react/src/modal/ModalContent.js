import chainedFunction from 'chained-function';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { ButtonBase } from '../button';
import { Icon } from '../icon';
import { usePresence } from '../presence';
import { Fade } from '../transitions';
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

const ModalContentContainer = forwardRef(({
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
  const styleProps = {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 'modal',
  };

  return (
    <TransitionComponent
      appear={true}
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
    size,

    // internal use only
    contentRef,
  } = { ...modalContext };
  const combinedRef = useForkRef(contentRef, ref);
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
      {!!isClosable && (
        <ModalCloseButton onClick={onClose} />
      )}
    </Box>
  );
});

const ModalContent = React.forwardRef(({
  ContainerComponent = ModalContentContainer,
  ContainerProps,
  TransitionComponent = Fade,
  TransitionProps,
  children,
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
    <ContainerComponent
      TransitionComponent={TransitionComponent}
      TransitionProps={TransitionProps}
      {...ContainerProps}
    >
      <ModalContentFront ref={ref} {...rest}>
        {children}
      </ModalContentFront>
    </ContainerComponent>
  );
});

ModalContent.displayName = 'ModalContent';

export default ModalContent;
