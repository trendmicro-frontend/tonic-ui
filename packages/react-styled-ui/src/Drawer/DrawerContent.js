import React, { forwardRef } from 'react';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import useForkRef from '../utils/useForkRef';
import { useDrawer } from './context';
import {
  useDrawerContentStyles,
  useDrawerCloseButtonStyle,
} from './styles';

const DrawerCloseButton = (props) => {
  const closeButtonStyleProps = useDrawerCloseButtonStyle();

  return (
    <ButtonBase {...closeButtonStyleProps} {...props}>
      <Icon name="_core.close" />
    </ButtonBase>
  );
};

const DrawerContentBackdrop = forwardRef((props, ref) => {
  const context = useDrawer(); // context might be an undefined value
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
      zIndex="drawer"
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

const DrawerContentFront = forwardRef(({ children, ...props }, ref) => {
  const context = useDrawer(); // context might be an undefined value
  const {
    closeOnEsc,
    isCloseButtonVisible,
    onClose,
    placement,
    size,

    // internal use only
    contentRef,
  } = { ...context };
  const combinedRef = useForkRef(ref, contentRef);
  const contentStyleProps = useDrawerContentStyles({ placement, size });

  return (
    <Box
      ref={combinedRef}
      role="dialog"
      tabIndex={-1}
      outline={0}
      position="absolute"
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
        <DrawerCloseButton onClick={onClose} />
      )}
    </Box>
  );
});

const DrawerContent = React.forwardRef(({ children, ...props }, ref) => {
  const context = useDrawer(); // context might be an undefined value
  const {
    backdrop,
  } = { ...context };

  if (!context) {
    return (
      <DrawerContentFront ref={ref} {...props}>
        {children}
      </DrawerContentFront>
    );
  }

  if (!backdrop) {
    return (
      <DrawerContentFront
        ref={ref}
        position="fixed"
        zIndex="drawer"
        top={0}
        height="100%"
        {...props}
      >
        {children}
      </DrawerContentFront>
    );
  }

  return (
    <DrawerContentBackdrop>
      <DrawerContentFront ref={ref} {...props}>
        {children}
      </DrawerContentFront>
    </DrawerContentBackdrop>
  );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
