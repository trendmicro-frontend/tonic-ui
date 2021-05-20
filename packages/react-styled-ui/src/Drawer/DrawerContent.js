import React, { forwardRef } from 'react';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import usePresence from '../Presence/usePresence';
import Slide from '../Transitions/Slide';
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
  TransitionComponent = Slide,
  ...props
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
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
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
      in={isOpen}
      direction={direction}
      onExited={safeToRemove}
    >
      {(state, { ref, style }) => (
        <Box
          ref={ref}
          onClick={event => {
            event.stopPropagation();
            if (closeOnOutsideClick) {
              (typeof onClose === 'function') && onClose(event);
            }
          }}
          {...backdropStyleProps}
          {...style}
          {...props}
        />
      )}
    </TransitionComponent>
  );
});

const DrawerContentFront = forwardRef(({ children, ...props }, ref) => {
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    closeOnEsc,
    isCloseButtonVisible,
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
      {...props}
    >
      {children}
      {!!isCloseButtonVisible && (
        <DrawerCloseButton onClick={onClose} />
      )}
    </Box>
  );
});

const DrawerContent = React.forwardRef(({
  children,
  zIndex = 'drawer',
  ...props
}, ref) => {
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    backdrop,
  } = { ...drawerContext };

  if (!drawerContext) {
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
        zIndex={zIndex}
        top={0}
        height="100%"
        {...props}
      >
        {children}
      </DrawerContentFront>
    );
  }

  return (
    <DrawerContentBackdrop zIndex={zIndex}>
      <DrawerContentFront ref={ref} {...props}>
        {children}
      </DrawerContentFront>
    </DrawerContentBackdrop>
  );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
