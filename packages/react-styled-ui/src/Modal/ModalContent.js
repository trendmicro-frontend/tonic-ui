import React, { forwardRef } from 'react';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import useForkRef from '../utils/useForkRef';
import { useModal } from './context';
import {
  useModalContentStyle,
  useModalCloseButtonStyle,
} from './styles';

const ModalCloseButton = (props) => {
  const closeButtonStyleProps = useModalCloseButtonStyle();

  return (
    <ButtonBase {...closeButtonStyleProps} {...props}>
      <Icon icon="close" />
    </ButtonBase>
  );
};

const ModalContentBackdrop = forwardRef((props, ref) => {
  const context = useModal(); // context might be an undefined value
  const {
    closeOnOutsideClick,
    onClose,
  } = { ...context };

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      width="100%"
      height="100%"
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={event => {
        event.stopPropagation();
        if (closeOnOutsideClick) {
          (typeof onClose === 'function') && onClose(event);
        }
      }}
      {...props}
    />
  );
});

const ModalContentFront = forwardRef(({ children, ...props }, ref) => {
  const context = useModal(); // context might be an undefined value
  const {
    closeOnEsc,
    isCloseButtonVisible,
    onClose,
    size,

    // internal use only
    contentRef,
  } = { ...context };
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
      {...props}
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
  ...props
}, ref) => {
  const context = useModal(); // context might be an undefined value

  if (!context) {
    return (
      <ModalContentFront ref={ref} {...props}>
        {children}
      </ModalContentFront>
    );
  }

  return (
    <ModalContentBackdrop zIndex={zIndex}>
      <ModalContentFront ref={ref} {...props}>
        {children}
      </ModalContentFront>
    </ModalContentBackdrop>
  );
});

ModalContent.displayName = 'ModalContent';

export default ModalContent;
