import chainedFunction from 'chained-function';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { ButtonBase } from '../button';
import { Icon } from '../icon';
import { usePresence } from '../presence';
import { Slide } from '../transitions';
import useForkRef from '../utils/useForkRef';
import {
  useDrawerContentStyle,
  useDrawerCloseButtonStyle,
} from './styles';
import useDrawer from './useDrawer';

const DrawerCloseButton = (props) => {
  const closeButtonStyleProps = useDrawerCloseButtonStyle();

  return (
    <ButtonBase {...closeButtonStyleProps} {...props}>
      <Icon icon="close" />
    </ButtonBase>
  );
};

const DrawerContentBackdrop = forwardRef(({
  TransitionComponent,
  TransitionProps,
  ...rest
}, ref) => {
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    isOpen,
    placement,
    closeOnOutsideClick,
    onClose,
  } = { ...drawerContext };
  const [, safeToRemove] = usePresence();
  const backdropStyleProps = {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const direction = {
    'left': 'right',
    'right': 'left',
    'top': 'down',
    'bottom': 'up',
  }[placement];

  return (
    <TransitionComponent
      appear={true}
      {...TransitionProps}
      in={isOpen}
      direction={direction}
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

const DrawerContentFront = forwardRef(({ children, ...rest }, ref) => {
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    closeOnEsc,
    isClosable,
    onClose,
    placement,
    size,

    // internal use only
    contentRef,
  } = { ...drawerContext };
  const combinedRef = useForkRef(ref, contentRef);
  const contentStyleProps = useDrawerContentStyle({ placement, size });

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
      {...rest}
    >
      {children}
      {!!isClosable && (
        <DrawerCloseButton onClick={onClose} />
      )}
    </Box>
  );
});

const DrawerContent = React.forwardRef(({
  children,
  zIndex = 'drawer',
  TransitionComponent = Slide,
  TransitionProps,
  ...rest
}, ref) => {
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    backdrop,
  } = { ...drawerContext };

  if (!drawerContext) {
    return (
      <DrawerContentFront ref={ref} {...rest}>
        {children}
      </DrawerContentFront>
    );
  }

  if (!backdrop) {
    return (
      <DrawerContentFront
        ref={ref}
        position="fixed"
        zIndex={zIndex}
        top={0}
        height="100%"
        {...rest}
      >
        {children}
      </DrawerContentFront>
    );
  }

  return (
    <DrawerContentBackdrop
      TransitionComponent={TransitionComponent}
      TransitionProps={TransitionProps}
      zIndex={zIndex}
    >
      <DrawerContentFront ref={ref} {...rest}>
        {children}
      </DrawerContentFront>
    </DrawerContentBackdrop>
  );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
